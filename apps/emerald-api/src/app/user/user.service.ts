import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@emerald/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Gets a specific user from the database
   * @param uuid the uuid of the user
   */
  async getUser(uuid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({userId: uuid});
    user.password = null;

    return user;
  }
}
