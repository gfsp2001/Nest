import { UserFindAllDto, UserDto, UserSaveDto } from '../infrastructure/dto/user.dto';

export interface IUseCaseUserService {
	getAllUsers(): Promise<UserFindAllDto[]>;
	saveUsers(newUser: UserSaveDto): Promise<UserDto>;
}