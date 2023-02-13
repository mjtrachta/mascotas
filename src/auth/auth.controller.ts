import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegistrerAuthDto } from './dto/registrer-auth.dto';

//TODO POST - http://localhost/auth
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //TODO registrer
  @Post('registrer')
  registrerUser(@Body() userObject: RegistrerAuthDto){
    return this.authService.registrer(userObject)
    //console.log({body: userObject})
  }

  //TODO login
  @Post('login')
  loginUser(@Body() userObjetLogin: LoginAuthDto){
    return this.authService.login(userObjetLogin)
  }


}
