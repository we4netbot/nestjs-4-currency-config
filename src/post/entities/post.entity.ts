import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column()
    content: string;

    @Column()
    location: string;

    @Column({
        default: 0
    })
    likecount: number;

    @Column({
        type: 'simple-array',
        default: ''
    })
    comments : string[];

    @Column({
        default: 0
    })
    price: number;
    
    @ManyToMany((type)=> CategoryEntity, categort=>categort.posts,{cascade: true})
    @JoinTable()
    categories: CategoryEntity[];

    @ManyToOne(()=> UserEntity, author=> author.posts)
    @JoinColumn()
    author: UserEntity
}
