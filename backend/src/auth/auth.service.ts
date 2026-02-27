import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.schema';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ userId: loginDto.userId });

    if (!user) {
      throw new UnauthorizedException('Invalid userId or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid userId or password');
    }

    const payload = {
      userId: user.userId,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
      },
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ userId: createUserDto.userId }, { email: createUserDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('User with this userId or email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Create new user
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      isFirstLogin: true,
    });

    const savedUser = await newUser.save();

    return {
      userId: savedUser.userId,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const user = await this.userModel.findOne({ userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, salt);

    user.password = hashedPassword;
    user.isFirstLogin = false;
    await user.save();

    return {
      message: 'Password changed successfully',
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findOne({ userId }).select('-password');

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async getAllUsers(role?: string) {
    const query: any = {};
    if (role) {
      query.role = role;
    }

    return this.userModel.find(query).select('-password');
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    const user = await this.userModel.findOneAndUpdate(
      { userId },
      { isActive },
      { new: true },
    ).select('-password');

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findOneAndDelete({ userId, role: 'staff' });
    if (!user) {
      throw new UnauthorizedException('Staff user not found');
    }
    return { message: 'Staff user deleted successfully' };
  }

  async seedAdmin(data: { userId: string; password: string; name: string; email: string }) {
    const adminExists = await this.userModel.findOne({ role: 'admin' });
    if (adminExists) {
      throw new ConflictException('Admin user already exists. Use the login page to access the admin panel.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const admin = new this.userModel({
      userId: data.userId,
      password: hashedPassword,
      name: data.name,
      email: data.email,
      role: 'admin',
      isFirstLogin: false,
      isActive: true,
    });
    const saved = await admin.save();
    return {
      message: 'Admin account created successfully',
      userId: saved.userId,
      name: saved.name,
      email: saved.email,
    };
  }
}
