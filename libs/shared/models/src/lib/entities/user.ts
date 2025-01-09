import { Role } from '../backend';

export interface User {
  uuid?: string;
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
  role?: Role;

}
