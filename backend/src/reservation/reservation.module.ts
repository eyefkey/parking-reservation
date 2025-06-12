import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { Reservation } from './entitites/reservation.entity';
import { EncryptionService } from '../services/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationResolver, ReservationService, EncryptionService]
})
export class ReservationModule {}
