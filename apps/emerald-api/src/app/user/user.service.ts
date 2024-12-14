import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@emerald/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Gets all users from the database
   */
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    users.forEach((user) => (user.password = null));

    return users;
  }

  /**
   * Gets a specific user from the database
   * @param uuid the uuid of the user
   */
  async getUser(uuid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: uuid });
    user.password = null;

    return user;
  }

  /**
   * Creates a new user
   * @param user the user to be created
   */
  createUser(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

  /**
   * Edits an already existing user
   * @param uuid the uuid of the user
   * @param user the new data of the user
   */
  editUser(uuid: string, user: User) {
    return Promise.resolve(undefined);
  }

  /**
   * Deletes an already existing user
   * @param uuid the uuid of the user
   */
  deleteUser(uuid: string) {
    return Promise.resolve(undefined);
  }
}
