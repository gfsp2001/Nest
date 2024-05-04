import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FLIGHTS, PASSENGER } from 'src/common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHTS.name,
        useFactory: () => {
          return FlightSchema.plugin(require('mongoose-autopopulate'));
        }
      },
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema;
        }
      }
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule { }
