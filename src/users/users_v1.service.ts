import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, email } = createUserDto;
        const user = new User(username, password, email);
        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log('error =>', error);
            
            throw new BadRequestException('There was an error creating the user');
        }
        return user;
    }

    async find(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new BadRequestException('There was an error getting all the users.');
        }
    }

    async findById(id: string): Promise<User> {
        let userFound;
        
        try {
            userFound = await this.userRepository.findOne({
                where: {
                    _id: new ObjectID(id)
                } as any
            });
        } catch (error) {
            console.log(error);
            
            throw new NotFoundException('Couldnt find the user requested.');
        }
      
        if (!userFound) throw new NotFoundException('User not found.');
        return userFound;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { password } = updateUserDto;
        const user = await this.findById(id);

        try {
            user.password = password;
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new BadRequestException('There was an error updating the user.');
        }
    }

    async delete(id: string): Promise<object> {
        const user = await this.findById(id);
        try {
            await this.userRepository.delete(user);
            return {
                message: 'User deleted successfully!'
            }
        } catch (error) {
            throw new BadRequestException('There was a problem deleting the user.');
        }
    }   
}
