import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx'; // Si la imagen es undefined, recibe la foto por defecto
    }
    // si es una imagen de google, devuelve la url de la imagen
        if ( img.indexOf('https') >= 0) {
          return img;
        }

    switch (tipo) {
      case 'usuario':
            url += '/usuarios/' + img;
            break;
      case 'medico':
            url += '/medicos/' + img;
            break;
      case 'hospital':
            url += '/hospitales/' + img;
            break;
      default:
            console.log('tipos de imagen válidos: usuarios, medicos, hospitales');
            url += '/usuarios/xxx';
            break;
    }

    return url;
  }

}
