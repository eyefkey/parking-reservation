import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entitites/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        private encryptionService: EncryptionService,
    ) {}

    private generateReservationCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    private async isSlotAvailable(parkingSection: string, slotNumber: number): Promise<boolean> {
        const existingReservation = await this.reservationRepository.findOne({
            where: { 
                parkingSection, 
                slotNumber,
                approved: true // Only check approved reservations for slot conflicts
            }
        });
        return !existingReservation;
    }

    async create(input: CreateReservationInput): Promise<Reservation> {
        // Check if slot is available
        const isAvailable = await this.isSlotAvailable(input.parkingSection, input.slotNumber);
        if (!isAvailable) {
            throw new Error(`Parking slot ${input.parkingSection}${input.slotNumber} is already reserved`);
        }

        // Generate unique reservation code
        let reservationCode: string;
        let isCodeUnique = false;
        do {
            reservationCode = this.generateReservationCode();
            const existingCode = await this.reservationRepository.findOne({ 
                where: { reservationCode } 
            });
            isCodeUnique = !existingCode;
        } while (!isCodeUnique);

        const encryptedLicensePlate = this.encryptionService.encryptLicensePlate(input.licensePlate);
        const encryptedDriversLicenseCode = this.encryptionService.encryptLicensePlate(input.driversLicenseCode);
        const encryptedPhoneNumber = this.encryptionService.encryptLicensePlate(input.phoneNumber);
        
        const newReservation = this.reservationRepository.create({
            name: input.name,
            licensePlate: encryptedLicensePlate,
            driversLicenseCode: encryptedDriversLicenseCode,
            phoneNumber: encryptedPhoneNumber,
            reservationCode,
            parkingSection: input.parkingSection,
            slotNumber: input.slotNumber,
            approved: false,
        });
        
        const savedReservation = await this.reservationRepository.save(newReservation);
        
        // Return the reservation with decrypted data for the response
        return {
            ...savedReservation,
            licensePlate: input.licensePlate,
            driversLicenseCode: input.driversLicenseCode,
            phoneNumber: input.phoneNumber,
        };
    }

    async findAll(): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.find();
        
        // Decrypt all encrypted fields for response
        return reservations.map(reservation => ({
            ...reservation,
            licensePlate: this.encryptionService.decryptLicensePlate(reservation.licensePlate),
            driversLicenseCode: this.encryptionService.decryptLicensePlate(reservation.driversLicenseCode),
            phoneNumber: this.encryptionService.decryptLicensePlate(reservation.phoneNumber),
        }));
    }

    async findAllPublic(): Promise<{ reservationCode: string; approved: boolean; parkingSection: string; slotNumber: number }[]> {
        const reservations = await this.reservationRepository.find({
            select: ['reservationCode', 'approved', 'parkingSection', 'slotNumber']
        });
        return reservations;
    }

    async getAvailableSlots(): Promise<{ section: string; slot: number }[]> {
        const sections = ['A', 'B', 'C', 'D'];
        const slots = [1, 2, 3, 4, 5];
        const allSlots: { section: string; slot: number }[] = [];
        
        for (const section of sections) {
            for (const slot of slots) {
                const isAvailable = await this.isSlotAvailable(section, slot);
                if (isAvailable) {
                    allSlots.push({ section, slot });
                }
            }
        }
        
        return allSlots;
    }

    async update(input: UpdateReservationInput): Promise<Reservation> {
        const updateData: any = {};
        
        if (input.name !== undefined) {
            updateData.name = input.name;
        }
        
        if (input.licensePlate !== undefined) {
            updateData.licensePlate = this.encryptionService.encryptLicensePlate(input.licensePlate);
        }
        
        if (input.driversLicenseCode !== undefined) {
            updateData.driversLicenseCode = this.encryptionService.encryptLicensePlate(input.driversLicenseCode);
        }
        
        if (input.phoneNumber !== undefined) {
            updateData.phoneNumber = this.encryptionService.encryptLicensePlate(input.phoneNumber);
        }

        if (input.parkingSection !== undefined) {
            updateData.parkingSection = input.parkingSection;
        }

        if (input.slotNumber !== undefined) {
            updateData.slotNumber = input.slotNumber;
        }
        
        if (input.approved !== undefined) {
            updateData.approved = input.approved;
        }

        await this.reservationRepository.update(input.id, updateData);
        
        const reservation = await this.reservationRepository.findOne({ where: { id: input.id } });
        if (!reservation) {
            throw new Error(`Reservation with id ${input.id} not found`);
        }
        
        // Return with decrypted data
        return {
            ...reservation,
            licensePlate: this.encryptionService.decryptLicensePlate(reservation.licensePlate),
            driversLicenseCode: this.encryptionService.decryptLicensePlate(reservation.driversLicenseCode),
            phoneNumber: this.encryptionService.decryptLicensePlate(reservation.phoneNumber),
        };
    }

    async findOne(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new Error(`Reservation with id ${id} not found`);
        }
        
        // Return with decrypted data
        return {
            ...reservation,
            licensePlate: this.encryptionService.decryptLicensePlate(reservation.licensePlate),
            driversLicenseCode: this.encryptionService.decryptLicensePlate(reservation.driversLicenseCode),
            phoneNumber: this.encryptionService.decryptLicensePlate(reservation.phoneNumber),
        };
    }
}

