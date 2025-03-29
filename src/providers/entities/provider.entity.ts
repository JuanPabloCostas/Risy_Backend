import { Column, ObjectIdColumn, OneToMany } from "typeorm";
import { Post } from "src/posts/entities/post.entity";

export class Provider {
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    photoUrl: string;

    @Column()
    password: string;
    
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })   
    registeredAt: Date;

    @OneToMany(() => Post, (post) => post.id)
    posts: Post
}
