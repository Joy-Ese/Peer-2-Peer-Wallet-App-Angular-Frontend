import { Component, ViewEncapsulation } from '@angular/core';
import { PreLoaderService } from 'src/app/services/pre-loader.service';

@Component({
  selector: 'app-pre-spinner',
  templateUrl: './pre-spinner.component.html',
  styleUrls: ['./pre-spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PreSpinnerComponent {
  constructor(public loader: PreLoaderService) { }
}
