import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              title: 'Test Task',
              description: 'Test Description',
            }),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: '1', title: 'Test Task' }),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
