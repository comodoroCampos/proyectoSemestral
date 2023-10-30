import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { UsuarioModel } from '../models/UsuarioModel';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})
export class LoginPage implements OnInit, OnDestroy {

  userLoginModal: UsuarioModel = {
    nombre_usuario: '',
    pass: ''
  };

  public userExists?: UsuarioModel;
  public userList$!: Subscription;
  public userList: UsuarioModel[] = [];

  pasajeroLogeado: any;

  tipoPerfil!: string;

  public alertButtons = ['OK'];

  constructor(private route: Router, private _usuarioService: UserService) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.userLoginModalRestart();

  }

  async setObject(user: UsuarioModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async userLogin(userLoginInfo: UsuarioModel) {
    this._usuarioService.getLoginUser(userLoginInfo.nombre_usuario, userLoginInfo.pass).subscribe(
      {
        next: (user) => {
          console.log(user);

          if (this.tipoPerfil != 'CONDUCTOR' && this.tipoPerfil != 'PASAJERO') {
            this.alertButtons;
          }

          console.log(this.tipoPerfil)

          if (user.length > 0) {
            //EXISTE
            let userInfoSend: NavigationExtras = {
              state: {
                userInfo: user[0]
              }
            }
            console.log("Usuario existe...", userInfoSend);
            this.setObject(user[0]);
            if (user[0].tipo_usuario == 1 && this.tipoPerfil == 'CONDUCTOR') {
              this.route.navigate(['/usuario'], userInfoSend)
              this.userLoginModalRestart();
            } else
              if (user[0].tipo_usuario == 2 && this.tipoPerfil == 'PASAJERO') {
                let sendInfo = this.route.navigate(['/pasajero'], userInfoSend);
                this.userLoginModalRestart();
              }
          } else {
            //NO EXISTE
            console.log("Usuario no existe...");
          }
        },
        error: (err) => {

        },
        complete: () => {

        }
      }
    )
  }

  crearUsuario() {
    this.route.navigate(['/registrarusuario']);
    this.userLoginModalRestart();
  }

  recuperarContrasena() {
    this.route.navigate(['/restablecercontrasena']);
    this.userLoginModalRestart();
  }

  userLoginModalRestart(): void {
    this.userLoginModal.nombre_usuario = '';
    this.userLoginModal.pass = '';
  }

  seleccion(ev: any) {
    this.tipoPerfil = ev.target.value;
    console.log(this.tipoPerfil)
  }

}

