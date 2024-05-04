import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    readonly usu_id: number;
    @Column()
    readonly usu_nom: string;
    @Column()
    readonly usu_ape_pat: string;
    @Column()
    readonly usu_ape_mat: string;
    @Column()
    readonly usu_cor: string;
    @Column()
    readonly usu_con: string;
    @Column()
    readonly usu_rol: string;
    @Column()
    readonly usu_est: number;
    @Column()
    readonly usu_fec_hor_reg: Date;
}