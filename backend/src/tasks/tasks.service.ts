import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }
  async findAllPage(page: number=1, limit: number=10): Promise<{ tasks: Task[], totalTasks: number }> {
    const [tasks, totalTasks] = await this.tasksRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { tasks, totalTasks };
  }
  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
  async Search(searchTerm: string): Promise<{ tasks: Task[], totalTasks: number }> {
    const tasks = await this.tasksRepository.find({ where: { title: Like(`%${searchTerm}%`) } });
    if (!tasks) {
      throw new NotFoundException(`Tasks not found for search term ${searchTerm}`);
    }
    const totalTasks = 1; 
    return { tasks, totalTasks };
}

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    const updatedTask = await this.tasksRepository.findOne({ where: { id } });
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
