import { IsString, MinLength, Matches } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(3)
  @Matches(/\S/, { message: 'Title cannot be empty or only spaces' })
  title: string;

  @IsString()
  @MinLength(10)
  @Matches(/\S/, { message: 'Content cannot be empty or only spaces' })
  content: string;

  @IsString()
  @Matches(/\S/, { message: 'Author cannot be empty or only spaces' })
  author: string;
}
