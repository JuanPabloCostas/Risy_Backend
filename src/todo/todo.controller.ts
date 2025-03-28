import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todosService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  // @Get()
  // findAll(): Promise<CreateTodoDto[]> {
  //   // return this.todosService.findAllTodos(); 
  //   return "Hello world from todo controller"
  // }

  @Get()
  findAll() {
    // return this.todosService.findAllTodos(); 
    return "Hello world from todo controller"
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOneTodo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.deleteTodo(+id);
  }
}