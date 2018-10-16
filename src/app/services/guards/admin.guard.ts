import { UsuarioService } from 'src/app/services/service.index';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService
  ) {

  }
  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this._usuarioService.logout();
      return false;
    }

  }
}
