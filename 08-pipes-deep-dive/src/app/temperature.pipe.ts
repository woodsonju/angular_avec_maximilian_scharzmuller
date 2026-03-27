import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp', //nom utilisé dans le template
})
export class TemperaturePipe implements PipeTransform {
  //value : valeur d'entrée  et args: paramètres de configuration
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah',
  ) {
    if (!value) {
      return value;
    }

    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp: number;

    //Celcius -> Fahrenheit
    //Formule (0 °C × 9/5) + 32 = 32 °F
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      //Fahrenheit -> Celcius
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val; //Même unité
    }

    // Détermination du symbole
    let symbol: '°C' | '°F';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    //return `${outputTemp} ${symbol}`;
    //Arrondi directement dans le pipe
    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
