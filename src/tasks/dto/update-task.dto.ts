import { IsDate, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  @IsOptional()
  status?: TaskStatus;
}
