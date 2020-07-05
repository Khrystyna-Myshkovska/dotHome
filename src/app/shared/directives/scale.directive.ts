import { Directive, ElementRef, Host } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appScale]'
})
export class ScaleDirective {

  constructor(private el:ElementRef) { }
  @HostListener('mouseover')onMouseOver(){
    this.el.nativeElement.style.transitionDuration = '0.3s';
    this.el.nativeElement.style.transform = 'scale(1.2, 1)';
  }
  @HostListener('mouseout')onMouseOut(){
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}
