import { CreateUserDTO } from './dto/create-user-input';
import { UpdateUserDTO } from './dto/update-user-input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private UserService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    const users = await this.UserService.findUsers();
    return users;
  }

  @Query(() => User, { name: 'userById' })
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.UserService.findUserById(id);
    return user;
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: CreateUserDTO): Promise<User> {
    const user = await this.UserService.createUser(data);
    return user;
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.UserService.updateUser(id, data);
    return user;
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.UserService.deleteUser(id);
    return deleted;
  }
}
