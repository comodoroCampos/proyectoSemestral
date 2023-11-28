import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { UsuarioModel } from "../models/UsuarioModel";
import { ViajeModel } from "../models/ViajeModel";
import { DetalleViajeModel } from "../models/DetalleViajeModel";


@Injectable({ providedIn: 'root' })
export class ViajeService {

    URL_SUPABASE = 'https://ozrblmbxawabpvfoabip.supabase.co/rest/v1/'

    constructor(private _httpclient: HttpClient) {

    }

    headers =new HttpHeaders({'apiKey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU'});

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU')

    getViajesConductor(id: number): Observable<ViajeModel[]> {
        return this._httpclient.get<ViajeModel[]>(this.URL_SUPABASE+'viaje?id_conductor=eq.'+id, { headers: this.headers});
    }   

    getViajePorId(id: number): Observable<Partial<ViajeModel[]>> {
        return this._httpclient.get<ViajeModel[]>(this.URL_SUPABASE+'viaje?id=eq.'+id, { headers: this.headers});
    }


    getViajesActivos(): Observable<Partial<ViajeModel[]>> {
        return this._httpclient.get<ViajeModel[]>(this.URL_SUPABASE+'viaje?activo=eq.'+true, { headers: this.headers});
    }
    
    getDetalleViaje(id:number): Observable<DetalleViajeModel[]> {
        return this._httpclient.get<DetalleViajeModel[]>(this.URL_SUPABASE+'/detalle_viaje?id_pasajero=eq.'+id, { headers: this.supabaseheaders });
    }


    getDetalleViajePorViaje(id:number): Observable<DetalleViajeModel[]> {
        return this._httpclient.get<DetalleViajeModel[]>(this.URL_SUPABASE+'/detalle_viaje?id_viaje=eq.'+id, { headers: this.supabaseheaders });
    }
    

    terminarViaje(id: number, viaje: Partial<ViajeModel>): Observable<Partial<ViajeModel>> {
        
        return this._httpclient.patch<Partial<ViajeModel>>(this.URL_SUPABASE + '/viaje?id=eq.'+id, viaje, { headers: this.supabaseheaders });
    }

    addNewViaje(viaje: Partial<ViajeModel>): Observable<Partial<ViajeModel>> {
        return this._httpclient.post<Partial<ViajeModel>>(this.URL_SUPABASE + '/viaje', viaje, { headers: this.supabaseheaders });
    }

    tomarViaje(detalle: Partial<DetalleViajeModel>): Observable<Partial<DetalleViajeModel>> {
        return this._httpclient.post<Partial<DetalleViajeModel>>(this.URL_SUPABASE + 'detalle_viaje', detalle, { headers: this.supabaseheaders });
    }

}