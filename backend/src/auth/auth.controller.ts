import { Controller, Post, Body, Get, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.userId, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get('users/:role')
  async getUsersByRole(@Param('role') role: string) {
    return this.authService.getAllUsers(role);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Put('users/:userId/status')
  async updateUserStatus(
    @Param('userId') userId: string,
    @Body() body: { isActive: boolean },
  ) {
    return this.authService.updateUserStatus(userId, body.isActive);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.authService.deleteUser(userId);
  }

  @Post('seed-admin')
  async seedAdmin(@Body() body: { userId: string; password: string; name: string; email: string }) {
    return this.authService.seedAdmin(body);
  }
}
