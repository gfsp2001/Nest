import { ISaveUserRepositoryDto } from '../dto/user-repository.dto';

export interface IValidateUserRepository {
    validateSaveUser(newUser: ISaveUserRepositoryDto): Promise<void>;
}
