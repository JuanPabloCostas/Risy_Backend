import { User } from "src/users/entities/user.entity";
import { Column, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn } from "typeorm";

enum PostType {
    SALE = "sale",
    DONATE = "donate",
    COMPOSED = "compose",
}
enum PostStatus  {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export class Post {
    @ObjectIdColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    photoUrl: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    originalPrice: string;

    @Column({ nullable: true })
    price: string;

    @Column()
    details: string;

    @Column({type: "enum"})
    type: PostType;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    @Column({ type: "enum",default: PostStatus.ACTIVE })
    status: PostStatus;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: User[];
}
