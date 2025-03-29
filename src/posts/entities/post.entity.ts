
import { Provider } from "src/providers/entities/provider.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

enum PostType {
    SALE = "sale",
    DONATE = "donate",
    COMPOSED = "compose",
}
enum PostStatus  {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity({ database: 'mongodb' })
export class Post {
    @ObjectIdColumn()
    _id: ObjectId;

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

    @ManyToMany(() => User, (user) => user.posts)
    // @JoinTable()
    users: User[];

    @ManyToOne(() => Provider, (provider) => provider.posts)
    provider: Provider;
}
