import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document {

    piloto: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers: IPassenger[];
}