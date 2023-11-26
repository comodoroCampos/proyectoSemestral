import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoModel } from '../models/VehiculoModel';
import { UserService } from '../services/user-service';
import { ViajeService } from '../services/viaje.service';
import { VehiculoService } from '../services/vehiculo.service';
import { ViajeModel } from '../models/ViajeModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViajesPage implements OnInit {

  userInfoReceived?: UsuarioModel;
  misAutos?: VehiculoModel[];
  auto?: VehiculoModel;

  viaje: Partial<ViajeModel> = {

    precio: 0,
    nro_viaje: 0,
    calificacion: 1,
    comentario: '',
    origen: '-33.03365431663931, -71.53317787905145',
    coordenadas_origen: 'string'
  };

  constructor(private viajeService: ViajeService, 
    private vehiculoService: VehiculoService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    //Recibir ID del usuario logeado
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    
  }

  ngOnInit() {


    if (this.userInfoReceived.tipo_usuario === 1) {
      this.obtenerVehiculos()
      
      


    } else {

    }
    //FUNCIONES PARA BUSCAR INFOMACION SOBRE EL ID DEL USUARIO LOGEADO

 //   this.x.traerInfoUsuarioLogeado(this.userId).subscribe(
 //     (data)=>{
 //       console.log(data);
 //       this.userInfoReceived=data[0];
 //     }
 //   );
//
 //   if (this.userInfoReceived.tipo_usuario = 1) {
//
 //     const auto = this.userInfoReceived.vehiculo.marca_vehiculo + this.userInfoReceived.vehiculo.modelo_vehiculo + this.userInfoReceived.vehiculo.color_vehiculo;
//
 //   }

  }


  async obtenerVehiculos() {
    this.vehiculoService.getVehiculosConductor(this.userInfoReceived.id).subscribe(
      (data)=>{
        console.log('obtenerVehiculos: ', data);
        this.misAutos = data
        this.obtenerViajes()
      }
    )
  }

  async obtenerViajes() {
    this.viajeService.getViajesConductor(this.userInfoReceived.id).subscribe(
      (data)=>{
        console.log('obtenerViajes: ', data);
      }
    );
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }


  irViajes() {
    this.router.navigate(['/login']);
  }


  onSelectChange(event: any) {
    this.auto = event.detail.value;
  }


iniciarViaje() {
  console.log('viaje: ', this.viaje);
  console.log('vehiculo: ', this.auto)
}


}
