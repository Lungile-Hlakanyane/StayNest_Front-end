export interface ChangePasswordPayload {
  userId: number;
  currentPassword: string;
  newPassword: string;
}