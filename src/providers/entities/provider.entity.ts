import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/posts/entities/post.entity";

@Entity({ name: "provider" })
export class Provider {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "email", type: "varchar", nullable: false })
    email: string;

    @Column({ name: "address", type: "varchar", nullable: false })
    address: string;

    @Column({ name: "phoneNumber", type: "varchar", nullable: false })
    phoneNumber: string;

    @Column({ name: "photoUrl", type: "varchar", nullable: true })
    photoUrl: string;

    @Column({ name: "password", type: "varchar", nullable: false })
    password: string;

    @Column({ name: "registeredAt", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    @OneToMany(() => Post, (post) => post.provider)
    posts: Post[]
}
