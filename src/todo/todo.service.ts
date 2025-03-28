import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { MongoRepository, Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) 
    private readonly todoRepository: MongoRepository<Todo>,
  ) {}

  public async createTodo(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(createTodoDto);
  }

  public async findAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  public async findOneTodo(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id } });
  }

  public async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.findOneTodo(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.update({ id }, updateTodoDto);
    return todo;
  }

  public async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
