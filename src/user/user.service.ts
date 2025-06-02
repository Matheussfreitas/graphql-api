import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user-input';
import { CreateUserDTO } from './dto/create-user-input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new Error('Problema ao buscar usuários');
    }
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new Error('Problema em criar usuário');
    }
    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.findUserById(id);
    await this.userRepository.update(user, { ...data });
    const updatedUser = this.userRepository.create({ ...user, ...data });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    const deleted = await this.userRepository.delete(user);
    if (!deleted) {
      throw new Error('Problema ao deletar usuário');
    }
    return true;
  }
}
