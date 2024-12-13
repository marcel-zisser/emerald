import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../backend';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 20 })
  role: Roles;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    role: Roles,
    email: string,
    password: string
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
