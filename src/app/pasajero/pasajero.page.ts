import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { VehiculoModel } from '../models/VehiculoModel';
import { UserService } from '../services/user-service';
import { ViajeService } from '../services/viaje.service';
import { ViajeModel } from '../models/ViajeModel';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PasajeroPage implements OnInit {

  idUser?:number;
  userInfoReceived?: UsuarioModel;
  viajesActivos?: ViajeModel[];

  vehiculoInfoReceived?: VehiculoModel;
  idUserHtmlRouterLink: any;
  cargando:boolean=false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private usuarioService:UserService,
    private logoutService: LogoutService,
    private viajeService: ViajeService) {
    this.idUser = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    
    this.usuarioService.traerInfoUsuarioLogeado(this.idUser??0).subscribe(
      (stk) => {
        this.userInfoReceived = stk[0];
        console.log(this.userInfoReceived);
        this.cargando = true;
        this.obtenerViajesActivos()
      },
      (err) => {
        this.cargando = false;
      }
    );

      }

  ngOnInit() {
  }

  irViaje(id: number) {
    console.log(id)
    let userInfoSend: NavigationExtras = {
      state: {
        userInfo: this.userInfoReceived,
        viaje: id
      }
    }
    this.router.navigate(['/viaje'],  userInfoSend);
  }


  obtenerViajesActivos() {
    this.viajeService.getViajesActivos().subscribe(
      (data) => {
        this.viajesActivos = data

      }
    )
  }

  cerrarSesion(){
    this.logoutService.logout()
    this.router.navigate(['/login']);
  }

}