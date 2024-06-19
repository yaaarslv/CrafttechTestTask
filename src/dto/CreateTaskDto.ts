import {IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @Length(3, 255, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    status: string;
}
