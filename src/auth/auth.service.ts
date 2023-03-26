import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from 'src/usuarios/usuarios.schema';
import { RegistrerAuthDto } from './dto/registrer-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
    private jwtServices: JwtService,
  ) {}

  async registrer(userObject: RegistrerAuthDto) {
    const nuevoUsuario = new this.usuariosModel(userObject);
    const hashPassword = await argon2.hash(nuevoUsuario.Password);
    nuevoUsuario.Password = hashPassword;
    return nuevoUsuario.save();
  }

  async login(userObjetLogin: LoginAuthDto) {
    const { Email, Password } = userObjetLogin;
    const findUser = await this.usuariosModel.findOne({ Email });
    if (!findUser) throw new HttpException('USER_NOT_FOUNT', 404);

    const checkPass = await argon2.verify(findUser.Password, Password);
    if (!checkPass) throw new HttpException('PASSWORD_INVALID', 403);

    const payload = { Id_usuario: findUser.Id_usuario, role: findUser.Role };
    const token = this.jwtServices.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }
}
