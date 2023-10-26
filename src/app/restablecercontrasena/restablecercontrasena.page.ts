import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioModel } from '../models/UsuarioModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restablecercontrasena',
  templateUrl: './restablecercontrasena.page.html',
  styleUrls: ['./restablecercontrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class RestablecercontrasenaPage implements OnInit {
  userInfoReceived: UsuarioModel | undefined;
  idUserHtmlRouterLink: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['user'];
    // Si quiero obtener un valor por URL usando routerLink
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    // Obteniendo el ID podria buscar en algún arreglo o BD el usuario con el id
    console.log("Valor obtenido desde URL: ", this.idUserHtmlRouterLink);
  }

  ngOnInit() {
  }

  salir() {
    this.router.navigate(['/login']);
  }

}
