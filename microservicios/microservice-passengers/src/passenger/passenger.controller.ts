import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { PassengerMSG } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PassengerController {

    constructor(private readonly passengerService: PassengerService) { }

    @MessagePattern(PassengerMSG.CREATE)
    create(@Payload() PassengerDTO: PassengerDTO) {
        return this.passengerService.create(PassengerDTO);
    }

    @MessagePattern(PassengerMSG.FIND_ALL)
    findAll() {
        return this.passengerService.findAll();
    }

    @MessagePattern(PassengerMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.passengerService.findOne(id);
    }

    @MessagePattern(PassengerMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.passengerService.update(payload.id, payload.passengerDTO);
    }

    @MessagePattern(PassengerMSG.DELETE)
    delete(@Payload() id: string) {
        return this.passengerService.delete(id);
    }
}
