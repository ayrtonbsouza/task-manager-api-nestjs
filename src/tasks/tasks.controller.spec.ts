import { Test, TestingModule } from '@nestjs/testing';
import { Task, TaskStatus } from '@prisma/client';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTask: Task = {
    id: '158954aa-ad24-44de-bf41-5a27ab011520',
    title: 'Task Title',
    description: 'Task Description',
    status: TaskStatus.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
    deadline: new Date(),
  };

  const mockTasksService: Partial<TasksService> = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  describe('[Constructor]', () => {
    it('should be able to instantiate the controller', () => {
      expect(controller).toBeDefined();
    });
  });
  describe('[Methods]', () => {
    describe('create', () => {
      it('should call service create method with the correct parameters', async () => {
        // Arrange
        const createTaskDto: CreateTaskDto = {
          title: 'Task Title',
          description: 'Task Description',
          deadline: new Date(),
        };

        // Act
        await controller.create(createTaskDto);

        // Assert
        expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
      });
    });
    describe('findAll', () => {
      it('should call service findAll method', async () => {
        // Act
        await controller.findAll();

        // Assert
        expect(mockTasksService.findAll).toHaveBeenCalled();
      });
    });
    describe('findOne', () => {
      it('should call service findOne method with the correct parameters', async () => {
        // Arrange
        const id = '158954aa-ad24-44de-bf41-5a27ab011520';

        // Act
        await controller.findOne(id);

        // Assert
        expect(mockTasksService.findOne).toHaveBeenCalledWith(id);
      });
    });
    describe('update', () => {
      it('should call service update method with the correct parameters', async () => {
        // Arrange
        const id = '158954aa-ad24-44de-bf41-5a27ab011520';
        const updateTaskDto: CreateTaskDto = {
          title: 'Task Title',
          description: 'Task Description',
          deadline: new Date(),
        };

        // Act
        await controller.update(id, updateTaskDto);

        // Assert
        expect(mockTasksService.update).toHaveBeenCalledWith(id, updateTaskDto);
      });
    });
    describe('remove', () => {
      it('should call service remove method with the correct parameters', async () => {
        // Arrange
        const id = '158954aa-ad24-44de-bf41-5a27ab011520';

        // Act
        await controller.remove(id);

        // Assert
        expect(mockTasksService.remove).toHaveBeenCalledWith(id);
      });
    });
  });
});
