/**
 * Auth Service
 * Calls the backend API directly using axiosInstance
 */
import axiosInstance from '@/lib/axiosInstance';
import type {
  LoginPayload,
  LoginResponse,
  ChangePasswordPayload,
  StaffUser,
  CreateStaffPayload,
  AuthUser,
} from '@/types';

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export const authService = {
  /** POST /api/auth/login */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await axiosInstance.post<LoginResponse>('/api/auth/login', payload);
    return res.data;
  },

  /** GET /api/auth/profile */
  async getProfile(token: string): Promise<AuthUser> {
    const res = await axiosInstance.get<AuthUser>('/api/auth/profile', {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** POST /api/auth/change-password */
  async changePassword(token: string, payload: ChangePasswordPayload): Promise<{ message: string }> {
    const res = await axiosInstance.post<{ message: string }>(
      '/api/auth/change-password',
      payload,
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** POST /api/auth/create-staff  (admin only) */
  async createStaff(token: string, payload: CreateStaffPayload): Promise<StaffUser> {
    const res = await axiosInstance.post<StaffUser>('/api/auth/create-staff', payload, {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** GET /api/auth/users  (admin only) */
  async getAllUsers(token: string): Promise<StaffUser[]> {
    const res = await axiosInstance.get<StaffUser[]>('/api/auth/users', {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** PUT /api/auth/users/:userId  (admin only) */
  async updateUserStatus(token: string, userId: string, isActive: boolean): Promise<StaffUser> {
    const res = await axiosInstance.put<StaffUser>(
      `/api/auth/users/${userId}`,
      { isActive },
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** DELETE /api/auth/users/:userId  (admin only) */
  async deleteUser(token: string, userId: string): Promise<{ message: string }> {
    const res = await axiosInstance.delete<{ message: string }>(
      `/api/auth/users/${userId}`,
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** POST /api/auth/logout */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/api/auth/logout');
    } catch {
      // ignore logout errors
    }
  },
};
