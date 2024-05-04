import { Inject, Injectable } from '@nestjs/common';
import { ICrudUserRepository } from '../domain/repository/user.interface';
import { UserRepository } from '../domain/repository/user.repository';
import { UserDto, UserFindAllDto, UserSaveDto } from '../infrastructure/dto/user.dto';
import { IUseCaseUserService } from './user-use-case.interface';

@Injectable()
export class UserUseCaseService implements IUseCaseUserService {
	constructor(
		@Inject(UserRepository)
		private readonly userRepository: ICrudUserRepository
	) { }

	async getAllUsers(): Promise<UserFindAllDto[]> {
		const users = await this.userRepository.getAllUsers();
		return users.map((user) => user);
	}

	async saveUsers(userDto: UserSaveDto): Promise<UserDto> {
		return await this.userRepository.saveUsers(userDto);
	}
}
