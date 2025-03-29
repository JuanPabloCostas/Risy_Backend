import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, ObjectIdColumn } from "typeorm";

enum UserType {
    PUBLICUSER = "publicuser", 
    ORGANIZATON = "organization", 
}

@Entity({ database: 'mongodb' })
export class User {
    @ObjectIdColumn()
    id: string; 

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    photo_url: string;

    @Column()
    password: string;

    @Column(
        {
        type: "enum",
        enum: UserType,
    }
    )
    type: UserType

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    @ManyToMany(() => Post, (post) => post.users)
    // @JoinTable()
    posts: Post[]
}
