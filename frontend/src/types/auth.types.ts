export type UserRole = 'admin' | 'staff';

export type AuthUser = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isFirstLogin: boolean;
};

export type LoginPayload = {
  userId: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: AuthUser;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type StaffUser = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isFirstLogin: boolean;
  createdAt: string;
};

export type CreateStaffPayload = {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};
