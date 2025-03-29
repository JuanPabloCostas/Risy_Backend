
import { Provider } from "src/providers/entities/provider.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

enum PostType {
    SALE = "sale",
    DONATE = "donate",
    COMPOSED = "compose",
}
enum PostStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity({ name: "post" })
export class Post {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "title", type: "varchar", nullable: false })
    title: string;

    @Column('json', { nullable: true })
    photoUrls: string[];

    @Column({ name: "description", type: "varchar", nullable: false })
    description: string;

    @Column({ name: "originalPrice", type: "varchar", nullable: true })
    originalPrice: string;

    @Column({ name: "price", type: "varchar", nullable: true })
    price: string;

    @Column({ name: "details", type: "varchar", nullable: false })
    details: string;

    @Column({ name: "type", type: "enum", enum: PostType, nullable: false })
    type: PostType;

    @Column({ name: "registeredAt", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    @Column({ type: "bool", default: true })
    status: boolean;

    @ManyToMany(() => User, (user) => user.posts)
    // @JoinTable()
    users: User[];

    @ManyToOne(() => Provider, (provider) => provider.posts)
    provider: Provider;
}
