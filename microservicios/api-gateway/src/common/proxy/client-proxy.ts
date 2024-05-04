import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabiitMQ } from "../constants";

@Injectable()
export class ClientProxySuperFlights {
    constructor(private readonly config: ConfigService) { }

    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabiitMQ.UserQueue,
            }
        })
    }

    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabiitMQ.PassengerQueue,
            }
        })
    }

    clientProxyFlights(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabiitMQ.FlightQueue,
            }
        })
    }
}