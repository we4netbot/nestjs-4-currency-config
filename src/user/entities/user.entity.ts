import { EventEntity } from "src/event/entities/event.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>PostEntity, posts=> posts.author)
    posts: PostEntity[];

    @OneToMany(()=> EventEntity, event=> event.user)
    events: EventEntity[];
}
