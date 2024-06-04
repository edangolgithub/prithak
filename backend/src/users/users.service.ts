import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';


//export type User = any;

@Injectable()
export class UsersService {
      private readonly users = [
        {
          userId: 1,
          id:1,
          email:"dangol@gmail.com",
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          id:2,
          username: 'maria',
          email:"dangol@gmail.com",
          password: 'guess',
        },
      ]; 
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    //   async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    //   }

    async findOne(email: string): Promise<User | undefined> {
        console.log('here');
       // return this.users[0]
        return this.userRepository.findOne({ where: { email } });
    }
    async create(email: string, password: string,role:string): Promise<User> {
      const user = this.userRepository.create({  email, password,role });
      return this.userRepository.save(user);
    }
}