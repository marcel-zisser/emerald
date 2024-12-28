import { User } from '@prisma/client';

export interface RegisterRequest {
  user: User
}
