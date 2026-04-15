import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);

  constructor() {
    effect(() => {
      console.log(`Clicked button : ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    const subscription = interval(1000)
      .pipe(map((value) => value * 2))
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.error(err),
        complete: () => console.log('Completed'),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
