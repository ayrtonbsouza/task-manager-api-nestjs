import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Description of the task', required: false })
  description?: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'Deadline of the task',
    required: false,
    type: Date,
  })
  deadline?: Date;
}
