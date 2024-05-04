import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';
@Controller('api/v1/task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    method(@Body() taskDTO: TaskDTO) {
        //throw new BadRequestException('Error en la petición')
        //throw new HttpException('Error en la petición', HttpStatus.BAD_REQUEST);

        // return new Promise((resolve, reject) => {
        //     setTimeout(() => reject("Error en la petición"), 15000)
        // })
        return this.taskService.create(taskDTO);
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.taskService.findOne(id);
    }

    @Put(":id")
    udpate(@Param("id") id: string, @Body() taskDTO: TaskDTO) {
        return this.taskService.update(id, taskDTO);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.taskService.delete(id);
    }


}
