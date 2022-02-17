import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('config')
export class ConfigEntity {
    @PrimaryColumn()
    key: string;

    @Column({default:''})
    value: string;
}
