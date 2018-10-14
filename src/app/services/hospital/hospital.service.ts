import { UsuarioService } from './../usuario/usuario.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';




@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public token: string;
  public totalHospitales: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  obtenerHospital( id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
            .pipe( map( (resp: any) => resp.hospital ));
  }
  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                .pipe( map( resp => {
                  swal('Hospital borrado', 'El hospital ha sido borrado correctamente', 'success');
                }));
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre} )
                  .pipe( map( (resp: any) => resp.hospital ));
  }
  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get( url )
                .pipe( map( (resp: any) => resp.hospital ));
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                  .pipe( map( (resp: any) => {
                    swal('Hospital actualizado', hospital.nombre, 'success');
                    return resp.hospital;
                  }));
  }
}
