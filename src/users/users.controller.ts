import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    find(): Promise<User[]> {
        return this.usersService.find();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
       return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<object> {
        return this.usersService.delete(id);
    }
}
