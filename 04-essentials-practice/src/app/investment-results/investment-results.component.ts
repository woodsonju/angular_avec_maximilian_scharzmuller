import { CurrencyPipe } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { InvestmentService } from '../investment-service';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  //injecter le service d'investissement pour pouvoir accéder aux données calculées
  private investmentService = inject(InvestmentService);

  // get results() {
  //   return this.investmentService.resultData;
  // }

  //computed est une fonction qui crée un signal calculé, c'est-à-dire un signal
  //qui dépend d'autres signaux et qui est automatiquement mis à jour lorsque
  //ces signaux changent.
  results = computed(() => this.investmentService.resultData());
  //ou (idem)
  //results = this.investmentService.resultData.asReadonly();
}
