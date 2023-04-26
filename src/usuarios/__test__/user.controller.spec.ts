import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '../usuarios.controller';
import { UsuariosService } from '../usuarios.service';
import { CrearUsuarioDTO } from '../DTO/crear-usuario.dto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  const mockCrearUsuarioOutput = {
    Id_usuario : 1000,
    Nombre: 'testnombre',
    Apellido: 'testapellido',
    Email: 'testemail',
    Password: 'testpassword',
    Role: 'testrole',
  };

  const userServiceMock = {
    getUsuarios: jest.fn().mockResolvedValue([{}]),
    getPsicologos: jest.fn().mockResolvedValue([{}]),
    crearUsuario: jest.fn().mockResolvedValue(mockCrearUsuarioOutput),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = app.get<UsuariosController>(UsuariosController);
    service = app.get<UsuariosService>(UsuariosService);
  });

  describe('getUsuarios', () => {
    it('debe devolver una serie de usuarios', async () => {
      const result = await controller.getUsuarios();
      expect(result).toEqual([{}]);
    });
  });

  describe('getPsicologos', () => {
    it('debería devolver una serie de psicólogos', async () => {
      const result = await controller.getPsicologos();
      expect(result).toEqual([{}]);
    });
  });

  describe('crearUsuario', () => {
    it('debe devolver nuevo usuario', async () => {
      const nuevoUsuario: CrearUsuarioDTO = {
        Id_usuario : 1000,
        Nombre: 'testnombre',
        Apellido: 'testapellido',
        Email: 'testemail',
        Password: 'testpassword',
        Role: 'testrole',
      };

      const result = await controller.crearUsuario(nuevoUsuario);
      expect(result).toEqual(mockCrearUsuarioOutput);
      expect(service.crearUsuario).toHaveBeenCalledWith(nuevoUsuario);
    });
  });
});
