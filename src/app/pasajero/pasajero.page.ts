import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoModel } from '../models/VehiculoModel';
import { UserService } from '../services/user-service';

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

  vehiculoInfoReceived?: VehiculoModel;
  idUserHtmlRouterLink: any;
  cargando:boolean=false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private usuarioService:UserService) {
    this.idUser = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    
    this.usuarioService.traerInfoUsuarioLogeado(this.idUser??0).subscribe(
      (stk) => {
        this.userInfoReceived = stk[0];
        console.log(this.userInfoReceived);
        this.cargando = true;
      },
      (err) => {
        this.cargando = false;
      }
    );

      }

  ngOnInit() {
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
  }

}