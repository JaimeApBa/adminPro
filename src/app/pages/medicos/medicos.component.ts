import { URL_SERVICIOS } from './../../config/config';
import { MedicoService } from './../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalMedicos: number = 0;
  desde: number = 0;
  cargando: boolean = true;
  inputDisabled: boolean = false;
  medicos: Medico[];

  constructor(
    public _medicosService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos () {
    this.cargando = true;

    this._medicosService.cargarMedicos(this.desde)
            .subscribe( (resp: any) => {
                this.medicos = resp.medico;
                this.totalMedicos = resp.total;
                this.cargando = false;
            });
  }

  buscarMedico( termino: string) {
    if (termino.length <= 0) {
     this.cargarMedicos();
     return;
    }

    return this._medicosService.buscarMedicos(termino)
                  .subscribe( medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico) {
    this._medicosService.borrarMedico(medico._id)
            .subscribe(medicos => this.cargarMedicos());
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalMedicos || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

}
