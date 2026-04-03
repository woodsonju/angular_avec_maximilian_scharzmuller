import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  //NgZone est utilisé pour exécuter du code en dehors de la zone Angular ,
  //ce qui peut être utile pour éviter des déclenchements de détection
  //de changement inutiles.
  private zone = inject(NgZone);

  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    //Exécute le code en dehors de la zone Angular pour éviter les déclenchements
    //de détection de changement inutiles lorsque le timer expire.
    //Cela peut améliorer les performances de l'application en réduisant le nombre
    //de cycles de détection de changement.
    //Ce code ne sera pas surveillé par zone.js et la detection de changement
    //ne sera pas déclenchée lorsque le timer expire.
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Timer expired');
      }, 5000);
    });
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
