import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ClientRequest } from "http";
import { url } from "inspector";
import { ExtractJwt, Strategy as JwtStrategyFromPassport } from 'passport-jwt';

import { jwtConstants } from "./jwt.constants";



@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyFromPassport) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }




  async validate(payload: any, req: Request) {
    const idUsuario = +req.params.idUsuario;
    console.log(idUsuario)

    if (idUsuario !== payload.id_usuario) {
      throw new UnauthorizedException();
    }
    return { id_usuario: payload.id_usuario };
  }

  /*
  async validate(payload: any, req: Request) {

    const urlId = req.params.idUsuario;
    if (!(payload.id_usuario == urlId)){
      throw new HttpException('ehh que estas queriendo ver'+{urlId}, HttpStatus.FORBIDDEN);
    }
    return { id_usuario: payload.id_usuario, id_rol: payload.id_rol };
  }



  */
}

