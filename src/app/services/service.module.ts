
import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from './guards/admin.guard';
import { VerficaTokenGuard } from './guards/verfica-token.guard';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  MedicoService,
  LoginGuardGuard
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService,
    ModalUploadService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    VerficaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
