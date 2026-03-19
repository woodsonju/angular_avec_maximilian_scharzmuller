import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
  contentChild,
  AfterContentInit,
  afterNextRender,
  afterEveryRender,
} from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked!');
  // }
  label = input.required<string>();
  private el = inject(ElementRef);

  //Pour acceder au contenu projeté
  //HTMLInputElement et HTMLTextAreaElement sont les types d'éléments que nous pouvons projeter
  //dans ce composant (soit un input soit un textarea).
  //Le type de control est donc un ElementRef qui peut référencer soit un HTMLInputElement
  //soit un HTMLTextAreaElement.
  //Le décorateur ContentChild nous permet d'accéder à un élément du contenu projeté, ici
  //l'élément qui a la référence locale #input (dans le template de new-ticket.component.html).
  //Si on avait plusieurs éléments projetés avec la même référence locale, ContentChild nous
  //permettrait d'accéder au premier élément trouvé.
  //Si on veut accéder à tous les éléments avec la même référence locale, on peut utiliser ContentChildren.
  //Note: si on veut accéder à un élément du template du composant lui-même, on doit utiliser ViewChild
  //et non ContentChild.
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private control =
    contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(
      'input',
    );

  constructor() {
    afterEveryRender(() => {
      console.log('afterEveryRender');
    });
    afterNextRender(() => {
      console.log('afterNextRender');
    });
  }

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());
  }

  ngAfterContentInit(): void {}
}
