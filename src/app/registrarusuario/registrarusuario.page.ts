import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/user-service';
import { VehiculoService } from '../services/vehiculo.service';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoModel } from '../models/VehiculoModel';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.page.html',
  styleUrls: ['./registrarusuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})
export class RegistrarusuarioPage implements OnInit {

  userRegisterModal: Partial<UsuarioModel> = {
    nombre: '',
    apellido: '',
    mail: '',
    nombre_usuario: '',
    pass: '',
    tipo_usuario:null
  };

  userInfoReceived: UsuarioModel | undefined;
  idUserHtmlRouterLink: any;

  vehiculo: Partial<VehiculoModel> = {
    color_vehiculo: '',
    marca_vehiculo: '',
    modelo_vehiculo: '',
    patente_vehiculo: ''
  }

  tipoPerfil!: string;

  public alertButtons = ['OK'];

   constructor(private route: Router, private _usuarioService: UserService, private vehiculoService: VehiculoService) {
  }

  ngOnInit() {
  }

  guardar(){
    this.route.navigate(['/login']);
  }

  salir():void{
    this.route.navigate(['/login']);

  }

  seleccion(ev: any) {
    this.tipoPerfil = ev.target.value;
    console.log(this.tipoPerfil)
  }

  async registrarUsuario() {

    if (this.tipoPerfil != 'CONDUCTOR' && this.tipoPerfil != 'PASAJERO') {
      this.alertButtons;
    }
    if (this.tipoPerfil == 'CONDUCTOR') {
      if (this.userRegisterModal.nombre && this.userRegisterModal.apellido && this.userRegisterModal.nombre_usuario && this.userRegisterModal.pass
        && this.userRegisterModal.mail) {
          this.userRegisterModal.tipo_usuario = 1;
        try {
          console.log('vehiculo: ', this.vehiculo.patente_vehiculo)
          const response = await lastValueFrom(this._usuarioService.addNewUser(this.userRegisterModal));
          console.log(response);
          

         await this.guardarVehiculo()
          
          alert('Conductor registrado con éxito!');

          this.salir();
        } catch (error) {
          console.error(error);
          alert('Error al registrar el conductor.');
        }
      } else {
        console.log(this.userRegisterModal)
        alert('Por favor, completa todos los campos. ' + this.userRegisterModal);
      }
    }else{
      if (this.userRegisterModal.nombre && this.userRegisterModal.apellido && this.userRegisterModal.nombre_usuario && this.userRegisterModal.pass
        && this.userRegisterModal.mail) {
          this.userRegisterModal.tipo_usuario = 2;
        try {
          console.log('registrar')
          const response = await lastValueFrom(this._usuarioService.addNewUser(this.userRegisterModal));
          console.log(response);
          alert('Pasajero registrado con éxito!');
          this.salir();
        } catch (error) {
          console.error(error);
          alert('Error al registrar al pasajeror.');
        }
      } else {
        alert('Por favor, completa todos los campos.');
      }
    }
  }


  async guardarVehiculo() {
    console.log('guardar auto')
    this._usuarioService.getLoginUser(this.userRegisterModal.nombre_usuario, this.userRegisterModal.pass).subscribe(
      {
        next: (user) => {
          console.log('user encontrado: ', user[0])


          if (this.vehiculo) {

            this.vehiculo.usuario = user[0].id
            const response =  lastValueFrom(this.vehiculoService.addNewVehiculo(this.vehiculo));
            console.log('vehiculo registrado correctamente!')

          }
        }
      }
    )
  }
}