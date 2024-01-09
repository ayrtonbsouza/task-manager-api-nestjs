import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prismaService.task.create({
      data: {
        title: createTaskDto.title,
        status: TaskStatus.TODO,
        description: createTaskDto.description,
        deadline: createTaskDto.deadline,
      },
    });

    return task;
  }

  async findAll() {
    const tasks = await this.prismaService.task.findMany({
      where: {
        status: {
          not: TaskStatus.DELETED,
        },
      },
    });

    return tasks;
  }

  async findOne(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prismaService.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title ? updateTaskDto.title : task.title,
        description: updateTaskDto.description
          ? updateTaskDto.description
          : task.description,
        deadline: updateTaskDto.deadline
          ? updateTaskDto.deadline
          : task.deadline,
        status: updateTaskDto.status ? updateTaskDto.status : task.status,
      },
    });
  }

  async remove(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prismaService.task.update({
      where: { id },
      data: {
        status: TaskStatus.DELETED,
      },
    });
  }
}
