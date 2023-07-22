import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/isPublic.decorator';
import { LoginDto } from './dtos/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
