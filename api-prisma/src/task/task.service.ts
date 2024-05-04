import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAllTasks(): Promise<Task[]> {
        return this.prismaService.task.findMany();
    }
    async getTaskById(id: number): Promise<Task> {
        return this.prismaService.task.findUnique({ where: { id } });
    }
    async createTask(data: Task): Promise<Task> {
        return this.prismaService.task.create({ data: data });
    }
    async updateTask(id: number, data: Task): Promise<Task> {
        return this.prismaService.task.update({
            where: { id }, data
        });
    }
    async deleteTask(id: number): Promise<Task> {
        return this.prismaService.task.delete({ where: { id } });
    }

}
