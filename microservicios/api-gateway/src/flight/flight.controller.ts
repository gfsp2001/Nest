import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private _clientProxyFlight = this.clientProxy.clientProxyFlights()
    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers()

    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO);
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.UPDATE, { id, flightDTO });
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
        const passenger = await firstValueFrom(this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId));
        if (!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)
        return await firstValueFrom(this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, { flightId, passengerId }))
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

}
