import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);
  }
  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
              .pipe( map( (resp: any) => resp.medico ));
  }
  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
                .pipe( map( (resp: any) => resp.medicos ));
  }

  borrarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                .pipe( map( resp => {
                  swal('Mécido Borrado', 'Médico borrado correctamente', 'success');
                  return resp;
                }));
  }

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizando médico
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
                .pipe( map( (resp: any) => {
                  swal('Médico actualizado', medico.nombre, 'success');
                  return resp.medico;
                }));

    } else {
      // Creando médico
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
                .pipe( map( (resp: any) => {
                  swal('Médico creado', medico.nombre, 'success');
                  return resp.medico;
                }));
    }
  }
}
