import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { UsuarioModel } from "../models/UsuarioModel";


@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://ozrblmbxawabpvfoabip.supabase.co/rest/v1/'


    constructor(private _httpclient: HttpClient) {

    }

    headers =new HttpHeaders({'apiKey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU'});

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU')

    getLoginUser(username: string, password: string): Observable<UsuarioModel[]>{
        return this._httpclient.get<UsuarioModel[]>(this.URL_SUPABASE+'usuario?nombre_usuario=eq.'+username+'&pass=eq.'+password,{ headers: this.headers});
    }   

    addNewUser(user: Partial<UsuarioModel>): Observable<Partial<UsuarioModel>> {
        return this._httpclient.post<Partial<UsuarioModel>>(this.URL_SUPABASE + '/usuario', user, { headers: this.supabaseheaders });
    }
    
    traerInfoUsuarioLogeado(id:number): Observable<UsuarioModel[]> {
        return this._httpclient.get<UsuarioModel[]>(this.URL_SUPABASE+'/usuario?id=eq.'+id+'&select=id,nombre,mail,apellido,nombre_usuario,pass,tipo_usuario,vehiculo(*)',
        { headers: this.supabaseheaders });
    }
    
    
    obtenerbyEmail(mail:string): Observable<UsuarioModel[]> {
        return this._httpclient.get<UsuarioModel[]>(this.URL_SUPABASE+'/usuario?mail=eq.'+mail+'&select=id,nombre,mail,apellido,nombre_usuario,pass,tipo_usuario,vehiculo(*)',
        { headers: this.supabaseheaders });
    }

}