import { Comment } from "src/comments/entities/comment.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, ObjectId, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum UserType {
    PUBLICUSER = "publicuser", 
    ORGANIZATON = "organization", 
}

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

@Column({ name: "name", type: "varchar", nullable: false })
    name: string;

@Column({ name: "email", type: "varchar", unique: true, nullable: false })
    email: string;

@Column({ name: "phoneNumber", type: "varchar", nullable: false })
    phoneNumber: string;

@Column({ name: "photo_url", type: "varchar", nullable: true })  // Añadido "name"
    photo_url: string;

@Column({ name: "password", type: "varchar", nullable: false })  // Añadido "name"
    password: string;

@Column({
    name: "type",  // Añadido "name"
    type: "enum",
    enum: UserType,
    nullable: false,
})
    type: UserType;


@Column({ name: "registeredAt", type: "datetime", default: () => "CURRENT_TIMESTAMP" })  // Añadido "name"
    registeredAt: Date;


    @ManyToMany(() => Post, (post) => post.users)
    @JoinTable()
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
