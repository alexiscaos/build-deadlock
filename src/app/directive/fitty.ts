import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import fitty from 'fitty';

@Directive({
  selector: '[appFitty]',
  standalone: true
})
export class FittyDirective implements AfterViewInit, OnDestroy {
  @Input() fittyOptions: any = {};
  private fittyInstance: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.fittyInstance = fitty(this.el.nativeElement, this.fittyOptions);
  }

  ngOnDestroy() {
    if (this.fittyInstance) {
      this.fittyInstance.unsubscribe();
    }
  }
}
