import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'mongodb' }) 
export class Todo extends BaseEntity {
  @ObjectIdColumn()
  id: number; //todo's primary key

  @Column()
  title: string; //todo's title 

  @Column()
  status: string; //todo's status 
}