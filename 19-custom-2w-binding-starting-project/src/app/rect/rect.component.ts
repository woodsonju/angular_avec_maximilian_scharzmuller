import {
  Component,
  EventEmitter,
  input,
  Input,
  model,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-rect',
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  // @Input({ required: true }) size!: { width: string; height: string };
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  //model() pour le data-binding
  size = model.required<{ width: string; height: string }>();

  onReset() {
    this.size.set({
      width: '200',
      height: '100',
    });
  }
}
