import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  licensePlate?: string;

  @Field({ nullable: true })
  driversLicenseCode?: string;
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  parkingSection?: string;

  @Field({ nullable: true })
  slotNumber?: number;

  @Field({ nullable: true })
  approved?: boolean;
}
