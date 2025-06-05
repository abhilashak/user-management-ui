import type { User } from '../types/user';
import { config } from '../config';

export class UserService {
  static async getRandomUser(): Promise<User> {
    const response = await fetch(`${config.api.baseUrl}/user`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    const response = await fetch(`${config.api.baseUrl}/user`, {
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
    const response = await fetch(`${config.api.baseUrl}/id`);
    if (!response.ok) {
      throw new Error('Failed to get ID');
    }
    return response.json();
  }
} 