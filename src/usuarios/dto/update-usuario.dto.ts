import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

  readonly id_usuario? : number;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly email?: string;
  readonly password?: string;
  readonly id_rol?: number;
  readonly fecha_de_nacimiento?: Date;
}


