import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('Flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {

    constructor(
        private readonly flightService: FlightService,
        private readonly passengerService: PassengerService
    ) { }

    @Post()
    @ApiOperation({ summary: 'create flight' })
    create(@Body() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @Get()
    @ApiOperation({ summary: 'find flights' })
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'find flight' })
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'update flight' })
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete flight' })
    delete(@Param('id') id: string) {
        return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    @ApiOperation({ summary: 'add passenger to flight' })
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
        const passenger = await this.passengerService.findOne(passengerId)
        if (!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)
        return this.flightService.addPassenger(flightId, passengerId);
    }

}

