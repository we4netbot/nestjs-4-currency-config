import { EventTypesEnum } from "src/enums/event-types.enum";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'character',
        length: 20
    })
    massage: EventTypesEnum;

    @Column()
    content: string;

    @Column()
    reftype: string;

    @Column()
    refid: number;

    @ManyToOne(()=> UserEntity, user=> user.events)
    @JoinColumn()
    user: UserEntity;

}
