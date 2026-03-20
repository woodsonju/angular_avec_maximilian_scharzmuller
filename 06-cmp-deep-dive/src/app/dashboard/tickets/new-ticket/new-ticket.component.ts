import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
  Output,
  EventEmitter,
  output,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  //Avec la fonction viewChild (signal)
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  //@Output() add: EventEmitter<{ title: string; text: string }> = new EventEmitter();
  //Avec signal, output function
  add = output<{ title: string; text: string }>();

  onSubmit(title: string, ticketText: string) {
    this.add.emit({ title: title, text: ticketText });

    this.form().nativeElement.reset();
  }

  ngOnInit(): void {
    console.log('ONINIT');
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
    console.log(this.form().nativeElement);
  }
}
