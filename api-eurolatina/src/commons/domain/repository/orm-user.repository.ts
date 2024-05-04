import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IGetUserRepositoryDto, ISaveUserRepositoryDto, IUserRepositoryDto } from '../dto/user-repository.dto';
import { UserEntity } from '../entities/user.entity';
import { IOrmUserRepository } from './orm-user.repository.interface';
import * as bcrypt from "bcrypt";
import { ValidateUserRepository } from './validate-user.repository';
import { IValidateUserRepository } from './validate-user.repository.interface';

@Injectable()
export class OrmUserRepository extends Repository<UserEntity> implements IOrmUserRepository {

	constructor(dataSource: DataSource,
		@Inject(ValidateUserRepository)
		private readonly validateUserValidation: IValidateUserRepository
	) {
		super(UserEntity, dataSource.createEntityManager())
	}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	async saveUser(newUser: ISaveUserRepositoryDto): Promise<IUserRepositoryDto> {
		await this.validateUserValidation.validateSaveUser(newUser);
		newUser.usu_con = await this.hashPassword(newUser.usu_con);
		newUser.usu_est = 1;
		newUser.usu_fec_hor_reg = new Date();
		return await this.save(newUser);
	}

	async getAllUsers(): Promise<IGetUserRepositoryDto[]> {
		return await this.find();
	}
}