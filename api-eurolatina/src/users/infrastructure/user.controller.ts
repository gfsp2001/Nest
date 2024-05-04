import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IUseCaseUserService } from '../application/user-use-case.interface';
import { UserUseCaseService } from '../application/user-use-case.service';
import { UserDto, UserFindAllDto, UserSaveDto } from './dto/user.dto';

@Controller('api/v3/user')
export class UserController {
	constructor(
		@Inject(UserUseCaseService)
		private readonly _userService: IUseCaseUserService
	) { }

	@Get()
	getUsers(): Promise<UserFindAllDto[]> {
		return this._userService.getAllUsers();
	}

	@Post()
	@UsePipes(ValidationPipe)
	saveUser(@Body() user: UserSaveDto): Promise<UserDto> {
		return this._userService.saveUsers(user);
	}
}
