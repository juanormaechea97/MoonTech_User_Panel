import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5001', options: {} };

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {
  constructor() {
    super(config);
  }

  onUserLogged() {
    return this.fromEvent('userLogged');
  }

  onUserLoggedOut() {
    return this.fromEvent('userLoggedOut');
  }
}
