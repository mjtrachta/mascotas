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
      passReqToCallback: true
    });
  }

  async validate(req: Request,payload: any ) {
    const idUsuario = +req.params.idUsuario;
    console.log(idUsuario)

    if (payload.Role === "admin"  ) {
      return { Id_usuario: payload.Id_usuario };
    }

    if (idUsuario !== payload.Id_usuario) {
      throw new HttpException('ehh que estas queriendo ver', HttpStatus.FORBIDDEN);
    }
    return { Id_usuario: payload.Id_usuario };
  }

}

