import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AnalizaClankaService } from 'src/app/servisi/analiza-clanka.service';

import { AnalizaClankaSharedService } from 'src/app/shared-servisi/analiza-clanka-shared.service';

import { RezultatAnalizeClanka } from 'src/app/modeli/rezultat-analize-clanka.model';

@Component({
  selector: 'app-unosenje-teksta',
  templateUrl: './unosenje-teksta.component.html'
})
export class UnosenjeTekstaComponent {

    busy: Subscription;

    tekstClanka: string = '';
    rezulatAnalizeClanka: RezultatAnalizeClanka;

    constructor(
        private analizaClankaService: AnalizaClankaService,
        private analizaClankaSharedService: AnalizaClankaSharedService
    ) { }

    analizirajClanak(): void {
        this.busy = this.analizaClankaService.analizirajClanak(this.tekstClanka).subscribe(
            result => {
              this.rezulatAnalizeClanka = result as RezultatAnalizeClanka;

              this.analizaClankaSharedService.prikaziRezultatAnalizeClanka(this.rezulatAnalizeClanka);
            }
        );
    }

    get daLiPostojiTekst(): boolean {
        return this.tekstClanka !== '';
    }
}
