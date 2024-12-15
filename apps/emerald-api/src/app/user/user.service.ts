import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gets all users from the database
   */
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Gets a specific user from the database
   * @param userWhereUniqueInput criteria to find user
   */
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * Creates a new user
   * @param data the user to be created
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await bcrypt.hash(this.generatePassword(), 10);
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Edits an already existing user
   * @param params update params of the user
   */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  /**
   * Deletes an already existing user
   * @param where delete criteria
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  /**
   * Generates an initial password
   * @private
   */
  private generatePassword(): string {
    const length = crypto.randomInt(10, 20);
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((value) => chars[value % chars.length])
      .join('');
  }
}
