import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsPhoneNumber, IsPositive, IsString, Matches } from "class-validator";
import { In } from "typeorm";

enum UserType {
    PUBLICUSER = "publicuser", 
    ORGANIZATON = "organization",  
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    // @IsPhoneNumber()
    phoneNumber: string;

    @IsString()
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          'The password must have a Uppercase, lowercase letter and a number',
      })    @IsNotEmpty()
    password: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    type: UserType
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LikePostDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    postId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    userId: number;
}