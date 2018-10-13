import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuardGuard } from './guards/login-guard.guard';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService
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
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
