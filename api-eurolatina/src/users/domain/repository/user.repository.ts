import { Inject, Injectable } from '@nestjs/common';
import { IOrmUserRepository } from '../../../commons/domain/repository/orm-user.repository.interface';
import { OrmUserRepository } from '../../../commons/domain/repository/orm-user.repository';
import { IUserFindAllRepositoryModel, ISaveUserRepositoryModel, IUserRepositoryModel } from '../models/user-repository.model';
import { ICrudUserRepository } from './user.interface';
@Injectable()
export class UserRepository implements ICrudUserRepository {
	constructor(
		@Inject(OrmUserRepository)
		private readonly ormUserRepository: IOrmUserRepository
	) { }

	async getAllUsers(): Promise<IUserFindAllRepositoryModel[]> {
		const allUsers = await this.ormUserRepository.getAllUsers();
		return allUsers.map((user) => ({
			usu_id: user.usu_id,
			usu_nom: user.usu_nom,
			usu_ape_pat: user.usu_ape_pat,
			usu_ape_mat: user.usu_ape_mat,
			usu_cor: user.usu_cor,
		}));
	}

	async saveUsers(newUser: ISaveUserRepositoryModel): Promise<IUserRepositoryModel> {
		return await this.ormUserRepository.saveUser(newUser);
	}
}
