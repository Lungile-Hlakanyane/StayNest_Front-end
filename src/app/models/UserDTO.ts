export interface UserDTO {
  id?: any;
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  gender: string;
  status?: string;
  photo?: string;
  is_active?: boolean;
  block?: boolean;
}