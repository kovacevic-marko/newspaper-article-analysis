import { SentimentAnaliza } from './sentiment-analiza.model';
import { PredvidjanjeClanka } from './predvidjanje-clanka.model';

import _ from "lodash";

export class RezultatAnalizeClanka {
    predvidjanjeClanka: PredvidjanjeClanka;
    sentimentAnaliza: SentimentAnaliza;

    constructor(rezultatAnalize) {
        this.predvidjanjeClanka = _.mapKeys(rezultatAnalize.predvidjanje_clanka, (value, key) => _.camelCase(key));
        
        this.sentimentAnaliza  = _.mapKeys(rezultatAnalize.sentiment_analiza, (value, key) => _.camelCase(key));
    }
}