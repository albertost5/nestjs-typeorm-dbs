import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }

    async find(): Promise<User[]> {
        return await this.userRepository.findUsers();
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userRepository.updateUser(id, updateUserDto);
    }

    async delete(id: string): Promise<object> {
        return await this.userRepository.deleteUser(id);
    }   
}
