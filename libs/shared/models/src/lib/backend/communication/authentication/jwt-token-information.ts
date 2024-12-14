import { Roles } from './roles.enum';

export interface JwtTokenInformation {
  sub: string;
  firstName: string;
  lastName: string;
  role: Roles;
}