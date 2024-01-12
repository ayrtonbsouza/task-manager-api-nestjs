import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Title of the task' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Description of the task', required: false })
  description?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @ApiProperty({
    description: 'Deadline of the task',
    required: false,
    type: Date,
  })
  deadline?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.TODO,
  })
  status?: TaskStatus;
}
