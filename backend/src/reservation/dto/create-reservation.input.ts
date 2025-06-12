import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateReservationInput {
    @Field()
    name: string;

    @Field()
    licensePlate: string;

    @Field()
    driversLicenseCode: string;    @Field()
    phoneNumber: string;

    @Field()
    parkingSection: string;

    @Field()
    slotNumber: number;
}