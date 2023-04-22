import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors:{
    origin: '*',
  }
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('conexion', (socket) => {
      console.log(socket.id);
      console.log('Conectado');
    });
  }

  @SubscribeMessage('newMensaje')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMensaje', {
      msg: 'Nuevo Mensaje',
      content: body,
    });
  }
}


/*
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origen: '*',
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(cliente: any) {
    console.log(`Cliente conectado: ${cliente.id}`);
  }

  handleDisconnect(cliente: any) {
    console.log(`Cliente desconectado: ${cliente.id}`);
  }

  @SubscribeMessage('newMensaje')
  handleMessage(cliente: any, mensaje: string): void {
    this.server.emit('onMensaje',`${cliente.id}: ${mensaje}` );
    console.log(`${cliente.id}: ${mensaje}`)
  }
}
*/
