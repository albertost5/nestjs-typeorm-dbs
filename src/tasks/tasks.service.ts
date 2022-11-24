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

    create(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    findById(taskId: string): Promise<Task> {
        return this.taskRepository.findById(taskId);
    }

    update(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return this.taskRepository.updateTask(id, updateTaskStatusDto);
    }

    delete(taskId: string): Promise<object> {
        return this.taskRepository.deleteTask(taskId);
    }
}
