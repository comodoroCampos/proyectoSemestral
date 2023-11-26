import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { VehiculoModel } from '../models/VehiculoModel';
import { UserService } from '../services/user-service';
import { VehiculoService } from '../services/vehiculo.service';
import { ViajeModel } from '../models/ViajeModel';
import { ViajeService } from '../services/viaje.service';

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

  misViajes?: ViajeModel[]

  constructor(private userService: UserService,
     private vehiculoService: VehiculoService,
     private viajeService: ViajeService,
     private router: Router, private activatedRoute: ActivatedRoute) {
    //Recibir ID del usuario logeado
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);

  }

  ngOnInit() {
    //FUNCIONES PARA BUSCAR INFOMACION SOBRE EL ID DEL USUARIO LOGEADO

    this.userService.traerInfoUsuarioLogeado(this.userId).subscribe(
      (data)=>{
        console.log(data);
        this.userInfoReceived=data[0];

        this.viajeService.getViajesConductor(this.userInfoReceived.id).subscribe(
          (data)=>{
            this.misViajes = data
            console.log(this.misViajes)
          }
        )

      }
    );



  }


  cerrarSesion() {
    this.router.navigate(['/login']);
  }


  irViajes() {
    let userInfoSend: NavigationExtras = {
      state: {
        //ENVIAR SOLO ID
        userInfo: this.userInfoReceived
      }
    }
    this.router.navigate(['/viajes'],  userInfoSend);
  }

  miViaje(miViaje: number) {
    let userInfoSend: NavigationExtras = {
      state: {
        //ENVIAR SOLO ID
        userInfo: this.userInfoReceived,
        viaje: miViaje
      }
    }
    this.router.navigate(['/viaje'],  userInfoSend);
  }

}
