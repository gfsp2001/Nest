import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'create User' })
    create(@Body() UserDTO: UserDTO) {
        return this.userService.create(UserDTO);
    }

    @Get()
    @ApiOperation({ summary: 'find Users' })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'find User' })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'update User' })
    update(@Param('id') id: string, @Body() UserDTO: UserDTO) {
        return this.userService.update(id, UserDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete User' })
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }


}
