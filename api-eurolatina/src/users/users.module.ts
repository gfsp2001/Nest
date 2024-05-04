import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../commons/domain/entities/user.entity';
import { OrmUserRepository } from '../commons/domain/repository/orm-user.repository';
import { UserUseCaseService } from './application/user-use-case.service';
import { UserRepository } from './domain/repository/user.repository';
import { UserController } from './infrastructure/user.controller';
import { ValidateUserRepository } from 'src/commons/domain/repository/validate-user.repository';

@Module({
    controllers: [UserController],
    providers: [UserUseCaseService, UserRepository, OrmUserRepository, ValidateUserRepository],
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule { }
