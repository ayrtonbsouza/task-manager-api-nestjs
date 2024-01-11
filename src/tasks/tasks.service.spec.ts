import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('[Constructor]', () => {
    it('should be able to instantiate the service', () => {
      expect(service).toBeDefined();
    });
  });

  describe('[Methods]', () => {
    describe('create', () => {
      it('should be able to create a task', async () => {
        // Arrange
        prisma.task.create = jest.fn().mockResolvedValue({});
        const createTaskDto = {
          title: 'Task Title',
          description: 'Task Description',
          deadline: new Date(),
        };

        // Act
        await service.create(createTaskDto);

        // Assert
        expect(prisma.task.create).toHaveBeenCalledWith({
          data: {
            title: createTaskDto.title,
            status: 'TODO',
            description: createTaskDto.description,
            deadline: createTaskDto.deadline,
          },
        });
      });
    });
    describe('findAll', () => {
      it('should return an empty array if no tasks are found', async () => {
        // Arrange
        prisma.task.findMany = jest.fn().mockResolvedValue([]);

        // Act
        const result = await service.findAll();

        // Assert
        expect(result).toEqual([]);
      });
    });
    describe('findOne', () => {
      it('should be able to return a task by id', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue({});

        // Act
        await service.findOne('id');

        // Assert
        expect(prisma.task.findUnique).toHaveBeenCalledWith({
          where: { id: 'id' },
        });
      });

      it('should throw NotFoundException if no task is found', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue(null);

        // Act
        const result = service.findOne('id');

        // Assert
        await expect(result).rejects.toThrow(NotFoundException);
      });
    });
    describe('update', () => {
      it('should be able to update a task', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue({});
        prisma.task.update = jest.fn().mockResolvedValue({});

        // Act
        await service.update('id', {});

        // Assert
        expect(prisma.task.update).toHaveBeenCalledWith({
          where: { id: 'id' },
          data: {},
        });
      });

      it('should be able to receive parameters to update a task', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue({});
        prisma.task.update = jest.fn().mockResolvedValue({});
        const deadlineDate = new Date();

        // Act
        await service.update('id', {
          title: 'Task Title',
          description: 'Task Description',
          deadline: deadlineDate,
          status: 'TODO',
        });

        // Assert
        expect(prisma.task.update).toHaveBeenCalledWith({
          where: { id: 'id' },
          data: {
            deadline: deadlineDate,
            description: 'Task Description',
            status: 'TODO',
            title: 'Task Title',
          },
        });
      });

      it('should throw NotFoundException if no task is found', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue(null);

        // Act
        const result = service.update('id', {});

        // Assert
        await expect(result).rejects.toThrow(NotFoundException);
      });
    });
    describe('remove', () => {
      it('should set status as DELETED if task is found', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue({});
        prisma.task.update = jest.fn().mockResolvedValue({});

        // Act
        await service.remove('id');

        // Assert
        expect(prisma.task.update).toHaveBeenCalledWith({
          where: { id: 'id' },
          data: { status: 'DELETED' },
        });
      });

      it('should throw NotFoundException if no task is found', async () => {
        // Arrange
        prisma.task.findUnique = jest.fn().mockResolvedValue(null);

        // Act
        const result = service.remove('id');

        // Assert
        await expect(result).rejects.toThrow(NotFoundException);
      });
    });
  });
});
