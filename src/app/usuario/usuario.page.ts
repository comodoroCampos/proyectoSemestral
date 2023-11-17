import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoModel } from '../models/VehiculoModel';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsuarioPage implements OnInit {

  userInfoReceived?: UsuarioModel;
  userId?: number;

  constructor(private x: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    //Recibir ID del usuario logeado
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);

  }

  ngOnInit() {
    //FUNCIONES PARA BUSCAR INFOMACION SOBRE EL ID DEL USUARIO LOGEADO

    this.x.traerInfoUsuarioLogeado(this.userId).subscribe(
      (data)=>{
        
        this.userInfoReceived=data[0];
      }
    );

    if (this.userInfoReceived.tipo_usuario = 1) {

      const auto = this.userInfoReceived.vehiculo.marca_vehiculo + this.userInfoReceived.vehiculo.modelo_vehiculo + this.userInfoReceived.vehiculo.color_vehiculo;

    }

  }
  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}
