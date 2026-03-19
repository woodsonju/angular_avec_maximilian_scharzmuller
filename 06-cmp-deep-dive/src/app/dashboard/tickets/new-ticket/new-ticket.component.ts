import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

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

  onSubmit(titleElement: string, textInput: string) {
    console.log('Form submitted!');
    console.log(titleElement);
    console.log(textInput);
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
