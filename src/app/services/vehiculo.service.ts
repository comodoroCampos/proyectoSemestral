import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehiculoModel } from '../models/VehiculoModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  URL_SUPABASE = 'https://ozrblmbxawabpvfoabip.supabase.co/rest/v1/'


    constructor(private _httpclient: HttpClient) {

    }

    headers =new HttpHeaders({'apiKey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU'});

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU')



   getVehiculosConductor(id: number): Observable<VehiculoModel[]> {
       return this._httpclient.get<VehiculoModel[]>(this.URL_SUPABASE+'vehiculo?usuario=eq.'+id, { headers: this.headers});
   } 

   addNewVehiculo(vehiculo: Partial<VehiculoModel>): Observable<Partial<VehiculoModel>> {
      return this._httpclient.post<Partial<VehiculoModel>>(this.URL_SUPABASE + '/vehiculo', vehiculo, { headers: this.supabaseheaders });
   }




}