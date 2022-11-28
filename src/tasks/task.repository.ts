import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/updata-task-status.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskRepository extends Repository<Task> {
    
    constructor(
        // @InjectRepository(Task, 'postgres')
        // private readonly taskRepository: Repository<Task>
        // private readonly dataSource: DataSource,
        @InjectDataSource('postgres')
        private readonly dataSource: DataSource
    ) {
        super(Task, dataSource.createEntityManager(), dataSource.createQueryRunner());
        // super(taskRepository.target, taskRepository.manager ,taskRepository.queryRunner);
    }

    async findTasks(): Promise<Task[]> {
        try {
            return await this.find();
        } catch (error) {
            console.log('Find ERROR: ', error);
            
            throw new BadRequestException('There was an error retrieving all the tasks.');
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task(title, description);
        try {
            return await this.save(task);
        } catch (error) {
            throw new BadRequestException('There was a problem creating a new task.');
        }
    }

    async findById(taskId: string): Promise<Task> {
        try {
            return await this.findOneBy({id: taskId});
        } catch (error) {
            throw new NotFoundException('There was a problem finding the task.');
        }
    }

    async updateTask(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        try {
            await this.update(id, { status});
            return await this.findById(id);
        } catch (error) {
            throw new BadRequestException('There was an error updating the task status.');
        }
    }

    async deleteTask(taskId: string): Promise<object> {
        const taskToDelete = await this.findById(taskId);
        try {
            await this.delete(taskToDelete);
            return {
                message: `Task with id ${taskId} deleted successfully!`
            }
        } catch (error) {
            throw new BadRequestException('There was a problem deleting the task.');
        }
    }
}