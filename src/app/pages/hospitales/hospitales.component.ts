import { Hospital } from './../../models/hospital.model';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  desde: number = 0;
  totalHospitales: number = 0;
  cargando: boolean = true;
  inputDisabled: boolean = false;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
              .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde)
            .subscribe( (resp: any) => {
                this.hospitales = resp.hospital;
                this.totalHospitales = resp.total;
                this.cargando = false;
            });
  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital(hospital._id)
                  .subscribe(() => this.cargarHospitales());

  }
  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }). then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital( valor )
                .subscribe(() => this.cargarHospitales());
    });
  }
  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
              .subscribe();
  }

  buscarHospital( termino: string) {
    if (termino.length <= 0) {
     this.cargarHospitales();
     return;
    }

    return this._hospitalService.buscarHospital(termino)
                  .subscribe( hospitales => this.hospitales = hospitales);
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalHospitales || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

}
