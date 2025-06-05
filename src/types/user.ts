export interface User {
  id: string;
  name: string;
  biography: string;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  user: User;
}

export interface ErrorResponse {
  error: string;
}

export interface UserFormData {
  name: string;
  biography: string;
} 