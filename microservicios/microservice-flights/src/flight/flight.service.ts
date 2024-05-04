import { Injectable } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from 'src/common/interfaces/flights.interfaces';
import { Model } from 'mongoose'
import { FLIGHTS } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class FlightService {

    constructor(@InjectModel(FLIGHTS.name) private readonly model: Model<IFlight>) { }

    async create(flightDTO: FlightDTO): Promise<IFlight> {
        const newPassenger = new this.model(flightDTO);
        return await newPassenger.save();
    }

    async findAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    async findOne(id: string): Promise<IFlight> {
        return await this.model.findById(id).populate('passengers');
    }

    async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    async delete(id: string): Promise<IFlight> {
        return await this.model.findByIdAndDelete(id);
    }

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(flightId,
            { $addToSet: { passengers: passengerId } }, { new: true }).populate('passengers');
    }



}
