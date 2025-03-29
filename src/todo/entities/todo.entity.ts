import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ni' }) 
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number; //todo's primary key

  @Column({ name: 'user_id' })
  title: string; //todo's title 

  @Column()
  status: string; //todo's status 
}