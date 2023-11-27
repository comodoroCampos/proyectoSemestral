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
import { lastValueFrom } from 'rxjs';
import { DetalleViajeModel } from '../models/DetalleViajeModel';
import { LogoutService } from '../services/logout.service';

declare var google: any; // Asegúrate de tener esta declaración


@Component({
  selector: 'app-usuario',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViajePage implements OnInit {

  userInfoReceived?: UsuarioModel;
  misAutos?: VehiculoModel[];
  auto?: VehiculoModel;

  idViaje?: number;
  viaje?: ViajeModel;

  isConductor : boolean = false
  isPasajero : boolean = false

  map: any;
  direccionInicio: string = '';
  direccionDestino: string = '';
  autocompleteService: any;
  placesService: any;
  directionsService: any;
  directionsRenderer: any;


  

  constructor(private viajeService: ViajeService, 
    private vehiculoService: VehiculoService,
    private logoutService: LogoutService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    //Recibir ID del usuario logeado
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    this.idViaje = this.router.getCurrentNavigation()?.extras.state?.['viaje'];
    
  }

 
  ngOnInit() {
    this.obtenerViaje(this.idViaje)
      
    this.ionViewDidEnter()

    if (this.userInfoReceived.tipo_usuario === 1) {
      this.isConductor = true

    } else {

        this.isPasajero = true

    }


  }

  ionViewDidEnter() {
    this.loadMap();
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  }
  
  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(-33.03365431663931, -71.53317787905145),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  onDireccionChange() {
    if (this.viaje.direccion.length > 3) {
      this.calculateAndDisplayRoute();
    }
  }

  calculateAndDisplayRoute() {
    const currentLocation = new google.maps.LatLng(-33.03365431663931, -71.53317787905145);

    this.directionsService.route(
      {
        origin: currentLocation,
        destination: { query: this.viaje.direccion },
        travelMode: 'DRIVING',
      },
      (response: any, status: any) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);

          // Guarda la información de la ruta si es necesario
          const routeInformation = response.routes[0].legs[0];
          console.log('Distancia: ' + routeInformation.distance.text);
          console.log('Duración: ' + routeInformation.duration.text);
        } else {
          window.alert('No se pudo calcular la ruta: ' + status);
        }
      }
    );
  }
  



  async obtenerViaje(id: number) {
    this.viajeService.getViajePorId(id).subscribe(
      (data)=>{
        console.log('obtenerViaje: ', data);
        this.viaje = data[0]
        this.calculateAndDisplayRoute()

      }
    );
  }

  cerrarSesion() {
    this.logoutService.logout()

    this.router.navigate(['/login']);
  }


  terminarViaje() {
    console.log('terminar viaje')
    this.viaje.activo = false;
    console.log('viaje:', this.viaje)
    this.viajeService.terminarViaje(this.viaje.id, this.viaje)
    alert('El viaje se ha TERMINADO');
    
  }


  tomarViaje() {
    console.log('tomarViaje')
    alert('El viaje ha sido TOMADO');
    this.viaje.activo = false;
    console.log('viaje:', this.viaje)
    let detalle : DetalleViajeModel = {
      id_pasajero : this.userInfoReceived.id,
      id_viaje : this.viaje.id,
    }
    
    console.log('detalle: ', detalle)
    this.viajeService.getDetalleViajePorViaje(this.viaje.id).subscribe(
      (viajes) => {
        console.log('viajes: ', viajes)
        if (viajes && viajes.length < this.viaje.nro_viaje) {
            console.log('Se toma el viaje')
            try {
              const response =  lastValueFrom(this.viajeService.tomarViaje(detalle));
            } catch(err) {
              console.log(err)
            }
        }
      }
    )


  }





  onSelectChange(event: any) {
    this.auto = event.detail.value;
  }





}
