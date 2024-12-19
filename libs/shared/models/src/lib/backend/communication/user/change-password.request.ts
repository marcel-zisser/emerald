export interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}
