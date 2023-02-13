import { HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
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

  async validate(payload: any) {
    if(!(payload.id_rol == 1)){
      throw new HttpException ("NO", 401)
    }
    return { id_usuario: payload.id_usuario, id_rol: payload.id_rol };
  }

}
