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
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    @IsNotEmpty()
    password: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    type: UserType
}
