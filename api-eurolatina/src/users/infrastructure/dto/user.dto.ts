import { IsDate, IsEmail, IsNotEmpty, IsString, IsNumber, Length, IsInt, Min, Max, MaxLength, MinLength, IsEmpty, IsOptional, IsEnum } from "class-validator";
import { EUserEnum } from "../enum/user-rol.enum";


export class UserDto {
	usu_id: number;
	usu_nom?: string;
	usu_ape_pat?: string;
	usu_ape_mat?: string;
	usu_cor: string;
	usu_con: string;
	usu_rol: string;
	usu_est?: number;
	usu_fec_hor_reg?: Date;
}

export class UserSaveDto {

	@IsOptional()
	@Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
	@IsString({ message: 'El nombre debe ser una cadena de texto.' })
	usu_nom?: string;

	@IsOptional()
	@Length(1, 50, { message: 'El apellido paterno debe tener contener entre 1 y 50 caracteres.' })
	@IsString({ message: 'El apellido paterno debe ser una cadena de texto.' })
	usu_ape_pat?: string;

	@IsOptional()
	@Length(1, 50, { message: 'El apellido materno debe tener entre 1 y 50 caracteres.' })
	@IsString({ message: 'El apellido materno debe ser una cadena de texto.' })
	usu_ape_mat?: string;

	@MaxLength(20, { message: 'El correo electrónico debe tener máximo 20 caracteres.' })
	@IsEmail({}, { message: 'El correo electrónico es obligatorio.' })
	usu_cor: string;

	@IsNotEmpty({ message: 'La contraseña es obligatoria.' })
	@MaxLength(15, { message: 'La contraseña debe tener máximo 15 caracteres.' })
	usu_con: string;

	@IsEnum(EUserEnum, { message: 'El rol del usuario no coincide.' })
	@IsString({ message: 'El rol debe ser una cadena de texto.' })
	usu_rol: string;
}

export class UserFindAllDto {
	usu_id: number;
	usu_nom?: string;
	usu_ape_pat?: string;
	usu_ape_mat?: string;
	usu_cor: string;
}