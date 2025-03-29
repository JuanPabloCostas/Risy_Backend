import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

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
