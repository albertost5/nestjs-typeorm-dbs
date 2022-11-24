import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/updata-task-status.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    private taskRepositoryDataSource = this.dataSource.getRepository(Task);

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async find(): Promise<Task[]> {
        try {
            return await this.taskRepository.find();
        } catch (error) {
            throw new BadRequestException('There was an error retrieving all the users.');
        }
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task(title, description);
        try {
            return await this.taskRepositoryDataSource.save(task);
        } catch (error) {
            throw new BadRequestException('There was a problem creating a new task.');
        }
    }

    async findById(taskId: string): Promise<Task> {
        try {
            return await this.taskRepository.findOneBy({id: taskId});
        } catch (error) {
            throw new NotFoundException('There was a problem finding the task.');
        }
    }

    async update(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        try {
            await this.taskRepository.update(id, { status});
            return await this.findById(id);
        } catch (error) {
            throw new BadRequestException('There was an error updating the task status.');
        }
    }

    async delete(taskId: string): Promise<object> {
        const taskToDelete = await this.findById(taskId);
        try {
            await this.taskRepository.delete(taskToDelete);
            return {
                message: `Task with id ${taskId} deleted successfully!`
            }
        } catch (error) {
            throw new BadRequestException('There was a problem deleting the task.');
        }
    }
}
