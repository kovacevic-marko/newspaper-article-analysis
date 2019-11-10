import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppGlobals } from '../deljeno/app.global';
import { RezultatAnalizeClanka } from '../modeli/rezultat-analize-clanka.model';
import { Observable } from 'rxjs';

@Injectable()
export class AnalizaClankaService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient,
        private _global: AppGlobals
    ) { }

    analizirajClanak(tekstClanka: string): Observable<RezultatAnalizeClanka> {
        let url: string = this._global.urlPythonAplikacije +'analiziraj-clanak/';

        let jsonPodaci = {"tekstClanka" : tekstClanka};

        return this.http.post<RezultatAnalizeClanka>(url, jsonPodaci, this.httpOptions);
    }

}