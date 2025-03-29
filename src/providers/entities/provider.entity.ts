import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from "typeorm";
import { Post } from "src/posts/entities/post.entity";

@Entity({ database: 'mongodb' })
export class Provider {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    photoUrl: string;

    @Column()
    password: string;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })   
    registeredAt: Date;

    @OneToMany(() => Post, (post) => post.provider)
    posts: Post[]
}
