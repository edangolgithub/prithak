import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UnauthorizedException, Request, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PaginationDto } from './dto/pagination.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService, private jwtService: JwtService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  // @Get()
  // async findAll() {
  //   return await this.tasksService.findAll();
  // }
  @Get()
  async findAllPage(@Query() paginationDto: PaginationDto): Promise<{ tasks: Task[], totalTasks: number }> {
    const { page, limit } = paginationDto;
    //console.log(page);
    //  console.log(limit);

    return this.tasksService.findAllPage(page, limit);
  }
  @Get('search')
  async search(@Query('searchTerm') searchTerm: string): Promise<{ tasks: Task[], totalTasks: number }> {
    return this.tasksService.Search(searchTerm);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);

    if (decodedToken != null) {
      if (decodedToken.role !== 'admin') {
        throw new HttpException(
          { message: 'Only admin can delete tasks', error: 'Unauthorized' },
          HttpStatus.UNAUTHORIZED
        );
      }
    } else {
      throw new HttpException(
        { message: 'Invalid token', error: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED
      );
    }

    return await this.tasksService.remove(+id);
  }
}