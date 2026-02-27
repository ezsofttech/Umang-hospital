/**
 * Auth Service
 * Calls Next.js /api/auth/* proxy routes which in turn call the backend.
 * Uses a simple axios instance with relative base URL so it works in the browser.
 */
import axios from 'axios';
import type {
  LoginPayload,
  LoginResponse,
  ChangePasswordPayload,
  StaffUser,
  CreateStaffPayload,
  AuthUser,
} from '@/types';

// Separate lightweight instance for internal Next.js API routes
const proxyAxios = axios.create({
  baseURL: '/',          // relative – works in browser
  withCredentials: true, // send/receive cookies
  headers: { 'Content-Type': 'application/json' },
});

// Normalise error messages
proxyAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ??
      err.response?.data?.error ??
      err.message ??
      'Request failed';
    return Promise.reject(new Error(msg));
  }
);

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export const authService = {
  /** POST /api/auth/login */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await proxyAxios.post<LoginResponse>('/api/auth/login', payload);
    return res.data;
  },

  /** GET /api/auth/profile */
  async getProfile(token: string): Promise<AuthUser> {
    const res = await proxyAxios.get<AuthUser>('/api/auth/profile', {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** POST /api/auth/change-password */
  async changePassword(token: string, payload: ChangePasswordPayload): Promise<{ message: string }> {
    const res = await proxyAxios.post<{ message: string }>(
      '/api/auth/change-password',
      payload,
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** POST /api/auth/create-staff  (admin only) */
  async createStaff(token: string, payload: CreateStaffPayload): Promise<StaffUser> {
    const res = await proxyAxios.post<StaffUser>('/api/auth/create-staff', payload, {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** GET /api/auth/users  (admin only) */
  async getAllUsers(token: string): Promise<StaffUser[]> {
    const res = await proxyAxios.get<StaffUser[]>('/api/auth/users', {
      headers: authHeader(token),
    });
    return res.data;
  },

  /** PUT /api/auth/users/:userId  (admin only) */
  async updateUserStatus(token: string, userId: string, isActive: boolean): Promise<StaffUser> {
    const res = await proxyAxios.put<StaffUser>(
      `/api/auth/users/${userId}`,
      { isActive },
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** DELETE /api/auth/users/:userId  (admin only) */
  async deleteUser(token: string, userId: string): Promise<{ message: string }> {
    const res = await proxyAxios.delete<{ message: string }>(
      `/api/auth/users/${userId}`,
      { headers: authHeader(token) }
    );
    return res.data;
  },

  /** POST /api/auth/logout */
  async logout(): Promise<void> {
    try {
      await proxyAxios.post('/api/auth/logout');
    } catch {
      // ignore logout errors
    }
  },
};
