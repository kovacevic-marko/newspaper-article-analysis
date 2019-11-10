import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RezultatAnalizeClanka } from '../modeli/rezultat-analize-clanka.model';

@Injectable()
export class AnalizaClankaSharedService {

    constructor() { }

    // Prikazivanje rezultata analize clanka
    private prikazivanjeRezultataAnalizeClankaSource = new Subject<RezultatAnalizeClanka>();
    prikazivanjeRezultataAnalizeClanka$ = this.prikazivanjeRezultataAnalizeClankaSource.asObservable();
    prikaziRezultatAnalizeClanka(rezultatAnalizeClanka: RezultatAnalizeClanka) {
        this.prikazivanjeRezultataAnalizeClankaSource.next(rezultatAnalizeClanka);
    }

}