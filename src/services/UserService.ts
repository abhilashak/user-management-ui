import type { User } from '../types/user';

const API_BASE_URL = 'http://localhost:3000'; // adjust this to match your backend URL

export class UserService {
  static async getRandomUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  }

  static async getId(): Promise<{ id: string }> {
    const response = await fetch(`${API_BASE_URL}/id`);
    if (!response.ok) {
      throw new Error('Failed to get ID');
    }
    return response.json();
  }
} 