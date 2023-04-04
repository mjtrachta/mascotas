import { HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.constants";
import { Request } from "express";

@Injectable()
export class psicologoUsuarioStrategy extends PassportStrategy(Strategy, 'PsicoUsuario'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.secret,
        });
    }

    async validate(payload:any){
        //console.log("IdRol muestro rol: " + payload.Role)
        if(payload.Role === "admin" || payload.Role === "user"){

            return { IdUsuario: payload.IdUsuario}
        }

        else{
            throw new HttpException('nop', 401)
        }
      }

}
