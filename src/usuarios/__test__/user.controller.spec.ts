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
    it('debe devolver una serie de usuarios con los mismos campos que los usuarios almacenados en la base de datos', async () => {

      // Simula que hay varios usuarios almacenados en la base de datos.
      const usuariosBaseDatos = [
        {
          _id: '123456',
          Id_usuario: 1,
          Nombre: 'Juan',
          Apellido: 'Pérez',
          Email: 'juanperez@gmail.com',
          Password: 'JuanPerez123',
          Role: 'admin',
        },
        {
          _id: '789012',
          Id_usuario: 2,
          Nombre: 'María',
          Apellido: 'Gómez',
          Email: 'mariagomez@gmail.com',
          Password: 'MariaGomez456',
          Role: 'user',
        },
      ];

      // Simula que el servicio devuelve los usuarios almacenados en la base de datos.
      userServiceMock.getUsuarios.mockResolvedValue(usuariosBaseDatos);

      // Llama a la función getUsuarios() del controlador.
      const result = await controller.getUsuarios();

      // Define los campos que deberían tener los usuarios.
      const expectedFields = {
        _id: expect.any(String),
        Id_usuario: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),
        Email: expect.any(String),
        Password: expect.any(String),
        Role: expect.any(String),
      };

      // Comprueba que los usuarios devueltos por el controlador tienen los mismos campos que los usuarios almacenados en la base de datos.
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining(expectedFields)]));
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
