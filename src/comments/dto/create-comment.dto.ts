import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";


export class CreateCommentDto {

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  postId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  userId: number;
}
