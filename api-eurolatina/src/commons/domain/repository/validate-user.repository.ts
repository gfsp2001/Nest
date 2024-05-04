import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ISaveUserRepositoryDto } from '../dto/user-repository.dto';
import { UserEntity } from '../entities/user.entity';
import { IValidateUserRepository } from './validate-user.repository.interface';
@Injectable()
export class ValidateUserRepository extends Repository<UserEntity> implements IValidateUserRepository {

    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager())
    }

    async validateSaveUser(newUser: ISaveUserRepositoryDto): Promise<void> {
        const errors = [];
        const user = await this.findOneBy({ usu_cor: newUser.usu_cor });
        if (user) errors.push('El correo ya existe.');
        if (errors.length > 0) throw errors
    }

}