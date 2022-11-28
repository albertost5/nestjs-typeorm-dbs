import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/updata-task-status.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(private readonly taskRepository: TaskRepository) {}

    async find(): Promise<Task[]> {
        return await this.taskRepository.findTasks();
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task>{
        return await this.taskRepository.createTask(createTaskDto);
    }

    async findById(taskId: string): Promise<Task> {
        return await this.taskRepository.findById(taskId);
    }

    async update(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return await this.taskRepository.updateTask(id, updateTaskStatusDto);
    }

    async delete(taskId: string): Promise<object> {
        return await this.taskRepository.deleteTask(taskId);
    }
}
