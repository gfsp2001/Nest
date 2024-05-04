import { IGetUserRepositoryDto, IUserRepositoryDto, ISaveUserRepositoryDto } from '../dto/user-repository.dto';

export interface IOrmUserRepository {
    getAllUsers(): Promise<IGetUserRepositoryDto[]>;
    saveUser(newUser: ISaveUserRepositoryDto): Promise<IUserRepositoryDto>;
}
