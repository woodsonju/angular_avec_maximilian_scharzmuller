import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { NgClass } from '../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
