import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ViajeService {

    URL_SUPABASE = 'https://ozrblmbxawabpvfoabip.supabase.co/rest/v1/'


    constructor(private _httpclient: HttpClient) {

    }

    headers =new HttpHeaders({'apiKey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU'});

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cmJsbWJ4YXdhYnB2Zm9hYmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDA4MDQsImV4cCI6MjAxMjk3NjgwNH0.fJXWBONj30_1hmShqQg13ydzPnDIthmIS72NZWqUktU')

        
}