import { Role } from '../backend';

export class User {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    role: Role,
    email: string,
    password: string
  ) {
    this.uuid = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
