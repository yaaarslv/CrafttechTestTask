import {IsOptional, IsString, Length} from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @Length(3, 255, { message: 'Заголовок должен быть длиной минимум в 3 символа' })
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
