
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "content", type: "varchar", nullable: false })
  content: string;

  @Column({ name: "createdAt", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
