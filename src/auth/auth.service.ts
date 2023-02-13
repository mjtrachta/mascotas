// biblioteca que se comunica con la base de datos para hacer operaciones
import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from  'src/usuarios/DTO/create-usuario.dto'
import { UpdateUsuarioDto } from  'src/usuarios/DTO/update-usuario.dto'
import * as argon2 from 'argon2'
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RegistrerAuthDto } from './dto/registrer-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Http2ServerResponse } from 'http2';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  mail: RegistrerAuthDto;


constructor(@InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>,
  private jwtServices: JwtService) {}

  async registrer(userObject: RegistrerAuthDto){

    const nuevoUsuario = this.usuariosRepository.create(userObject)
    const hashPassword = await argon2.hash(nuevoUsuario.password);
    nuevoUsuario.password= hashPassword;
    return this.usuariosRepository.save(nuevoUsuario)
  };

  async login(userObjetLogin: LoginAuthDto){
    const { email, password } = userObjetLogin;
    const findUser =  await this.usuariosRepository.findOne({ where: { email } });
    if(!findUser) throw new HttpException("USER_NOT_FOUNT",404)

    const checkPass = await argon2.verify(findUser.password, password);
    if(!checkPass) throw new HttpException('PASSWORD_INVALID',403);

    const payload = {id_usuario:findUser.id_usuario, id_rol:findUser.id_rol}
    const token = this.jwtServices.sign(payload);

    const data = {
      user:findUser,
      token,
    }

    return data;

  };
}


