export interface IUserRepositoryModel {
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

export type IUserFindAllRepositoryModel = Omit<IUserRepositoryModel, 'usu_con' | 'usu_rol' | 'usu_est' | 'usu_fec_hor_reg'>;

export type ISaveUserRepositoryModel = Omit<IUserRepositoryModel, 'usu_id'>;