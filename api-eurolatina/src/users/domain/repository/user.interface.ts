import { IUserFindAllRepositoryModel, ISaveUserRepositoryModel, IUserRepositoryModel } from '../models/user-repository.model';

export interface ICrudUserRepository {
	getAllUsers(): Promise<IUserFindAllRepositoryModel[]>;
	saveUsers(newUser: ISaveUserRepositoryModel): Promise<IUserRepositoryModel>;
}