import { Component, OnDestroy } from '@angular/core';

import { AnalizaClankaSharedService } from 'src/app/shared-servisi/analiza-clanka-shared.service';

import { RezultatAnalizeClanka } from 'src/app/modeli/rezultat-analize-clanka.model';

import _ from "lodash";

@Component({
  selector: 'app-rezultat-analize',
  templateUrl: './rezultat-analize.component.html'
})
export class RezultatAnalizeComponent implements OnDestroy {

    sharedServices = [];

    rezulatAnalizeClanka: RezultatAnalizeClanka;

    // --- Pocetak Pie chart-a ---
    single = [];

    view: any[] = [300, 300];

    // options
    showLegend = false;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#0000FF', '#AAAAAA']
    };

    // pie
    showLabels = false;
    explodeSlices = false;
    doughnut = true;
    arcWidth = 0.35
    // --- Kraj Pie chart-a ---

    constructor(
        public analizaClankaSharedService: AnalizaClankaSharedService
    ) { 
        this.initSharedServices();
    }

    ngOnDestroy(): void {
        this.destroySharedServices();
    }

    initSharedServices(): void {
        this.sharedServices.push(
            this.analizaClankaSharedService.prikazivanjeRezultataAnalizeClanka$.subscribe(
                rezultat => {
                    this.rezulatAnalizeClanka = new RezultatAnalizeClanka(rezultat);

                    this.single = [
                        {
                          "name": "Позитивно",
                          "value": this.rezulatAnalizeClanka.sentimentAnaliza.pozitivno
                        },
                        {
                          "name": "Негативно",
                          "value": this.rezulatAnalizeClanka.sentimentAnaliza.negativno
                        },
                        {
                          "name": "Неутрално",
                          "value": this.rezulatAnalizeClanka.sentimentAnaliza.neutralno
                        }
                    ];
                }
            )
        )
    }

    destroySharedServices(): void {
        this.sharedServices.forEach(servis => {
            servis.unsubscribe();
        });
    }

}
