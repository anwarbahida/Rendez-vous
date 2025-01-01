import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateInfirmierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsPhoneNumber()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    address: string;
    @IsString()
    password: string;
    @IsString()
    roles: string;
}
