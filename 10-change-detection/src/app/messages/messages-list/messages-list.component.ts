import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.services';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  private messsagesService = inject(MessagesService);
  //ChangeDetectorRef est utilisé pour déclencher manuellement la détection de changement
  private cdRef = inject(ChangeDetectorRef);

  //DestroyRef est utilisé pour gérer la durée de vie des abonnements
  //et éviter les fuites de mémoire
  private destroyRef = inject(DestroyRef);

  messages: string[] = [];

  ngOnInit(): void {
    const subscription = this.messsagesService.message$.subscribe(
      (messages) => {
        this.messages = messages;
        //markForCheck dit à OnPush de re-rendre le composant
        //Permet déclencher manuellement la détection des changements dans un composant
        this.cdRef.markForCheck();
      },
    );

    //S'assure que la subscription est nettoyée lorsque le composant est supprimé,
    //évitant ainsi les fuites de mémoire.
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
