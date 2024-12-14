import { Roles } from '../backend';

export class User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    role: Roles,
    email: string,
    password: string
  ) {
    this.uuid = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
