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

declare var google: any; // Asegúrate de tener esta declaración


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
    cant_asientos: 0,
    calificacion: 1,
    comentario: '',
    origen: '-33.03365431663931, -71.53317787905145',
    coordenadas_origen: 'string'
  };

  isConductor : boolean = true

  map: any;
  direccion: string = '';
  autocompleteService: any;
  placesService: any;
  selectedLocation: any;


  constructor(private viajeService: ViajeService, 
    private vehiculoService: VehiculoService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    //Recibir ID del usuario logeado
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    
  }

  ngOnInit() {


    if (this.userInfoReceived.tipo_usuario === 1) {
      this.obtenerVehiculos()
      
      this.initMap();



    } else {

        this.isConductor = false

    }


  }

  ionViewDidEnter() {
    this.loadMap();
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(this.map);
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
    if (this.direccion.length > 3) {
      this.autocompleteService.getPlacePredictions({ input: this.direccion }, (predictions: any[]) => {
        if (predictions && predictions.length > 0) {
          this.placesService.getDetails({ placeId: predictions[0].place_id }, (place: any, status: any) => {
            if (status === 'OK') {
              this.map.setCenter(place.geometry.location);
              const marker = new google.maps.Marker({
                map: this.map,
                position: place.geometry.location,
                title: place.name,
              });

              // Guardar la ubicación seleccionada
              this.selectedLocation = {
                name: place.name,
                address: place.formatted_address,
                coordinates: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
              };
            }
          });
        }
      });
    }
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





  onSelectChange(event: any) {
    this.auto = event.detail.value;
  }


iniciarViaje() {




this.viaje.id_vehiculo = this.auto.id
this.viaje.cant_asientos = this.auto.cantidad_pasajeros

this.viaje.id_conductor = this.userInfoReceived.id
this.viaje.coordenadas_origen = "-33.03365431663931, -71.53317787905145"
this.viaje.direccion = this.selectedLocation.address
this.viaje.latitud = this.selectedLocation.coordinates.lat
this.viaje.longitud = this.selectedLocation.coordinates.lng
this.viaje.activo = true
console.log('viaje: ', this.viaje)

try {
  const response =  lastValueFrom(this.viajeService.addNewViaje(this.viaje));
} catch(err) {
  console.log(err)
}
}

initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -33.03365431663931, lng: -71.53317787905145 },
    zoom: 8,
  });
}

}
