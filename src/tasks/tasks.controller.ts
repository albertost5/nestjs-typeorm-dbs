import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/updata-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    find(): Promise<Task[]> {
        return this.tasksService.find();
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Get(':id')
    findById(@Param('id') taskId: string): Promise<Task> {
        return this.tasksService.findById(taskId);
    }

    @Patch(':id/status')
    update(@Param('id') id, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
        return this.tasksService.update(id, updateTaskStatusDto);
    }
    
    @Delete(':id')
    delete(@Param('id') taskId: string): Promise<object> {
        return this.tasksService.delete(taskId);
    }
}
