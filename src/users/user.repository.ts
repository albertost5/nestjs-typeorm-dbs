import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ObjectID } from 'mongodb'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends MongoRepository<User> {

    constructor(
        @InjectRepository(User, 'mongo')
        private readonly userRepository: MongoRepository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, email } = createUserDto;
        const user = new User(username, password, email);
        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('There was an error creating the user');
        }
        return user;
    }

    async findUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.log('error', error);
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

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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

    async deleteUser(id: string): Promise<object> {
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