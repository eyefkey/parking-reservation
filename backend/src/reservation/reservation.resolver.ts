import { Args, Resolver, Query, Mutation, ObjectType, Field } from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import { Reservation } from './entitites/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';

@ObjectType()
class PublicReservation {
    @Field()
    reservationCode: string;

    @Field()
    approved: boolean;

    @Field()
    parkingSection: string;

    @Field()
    slotNumber: number;
}

@ObjectType()
class AvailableSlot {
    @Field()
    section: string;

    @Field()
    slot: number;
}

@Resolver()
export class ReservationResolver {
    constructor(private readonly reservationService: ReservationService) {}

    @Query(() => [Reservation])
    async reservations(): Promise<Reservation[]> {
        return await this.reservationService.findAll();
    }

    @Query(() => [PublicReservation])
    async publicReservations(): Promise<PublicReservation[]> {
        return await this.reservationService.findAllPublic();
    }

    @Query(() => [AvailableSlot])
    async availableSlots(): Promise<AvailableSlot[]> {
        return await this.reservationService.getAvailableSlots();
    }

    @Mutation(() => Reservation)
    async createReservation(@Args('input') input: CreateReservationInput): Promise<Reservation> {
        return await this.reservationService.create(input);
    }

    @Mutation(() => Reservation)
    async updateReservation(@Args('input') input: UpdateReservationInput): Promise<Reservation> {
        return await this.reservationService.update(input);
    }
}
