import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  licensePlate: string; // This will store encrypted data in DB but return decrypted in GraphQL
  
  @Column()
  @Field()
  driversLicenseCode: string; // This will store encrypted data in DB but return decrypted in GraphQL
    @Column()
  @Field()
  phoneNumber: string; // This will store encrypted data in DB but return decrypted in GraphQL
  
  @Column({ unique: true })
  @Field()
  reservationCode: string; // 6-digit random code for tracking
  
  @Column()
  @Field()
  parkingSection: string; // A, B, C, or D
  
  @Column()
  @Field()
  slotNumber: number; // 1, 2, 3, 4, or 5
  
  @Column({ default: false })
  @Field()
  approved: boolean;
}