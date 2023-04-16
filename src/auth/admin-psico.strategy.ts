import { HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.constants";
import { Request } from "express";

@Injectable()

export class psicologoAdminStrategy extends PassportStrategy(Strategy, 'AdminPsico'){
  constructor(){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:jwtConstants.secret,
    });
  }


    async validate(payload:any){
      //console.log("IdRol muestro rol  " + payload.role)
      if(payload.Role === "admin" || payload.Role === "psiscologo"){

        return { IdUsuario: payload.IdUsuario}
      }

        else{
          throw new HttpException('nop', 401)
        }
    }

}
