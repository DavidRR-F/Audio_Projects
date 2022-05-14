import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import * as $ from "jquery";

@Directive({
  selector: '[KnobControl]'
})
export class KnobControlDirective {

  @HostBinding('class.knob')
  @Output() newAngle: EventEmitter<number> = new EventEmitter();

  grabbed: boolean = false;
  mousePosition: number = 0;
  angle: number = 0;
  initState: number = 0;
  minangle: number = 0;
  maxangle: number = 270;

  @HostListener('mousemove', ['$event']) onMove(event: MouseEvent) {
    if(this.grabbed){

      this.angle = this.initState + (this.mousePosition - event.clientY)
      
      if(this.angle < this.minangle) {
        this.angle = this.minangle;
      } 
      if (this.angle > this.maxangle) {
        this.angle = this.maxangle;
      }
      this.elRef.nativeElement.style.transform = 'rotate('+this.angle+'deg)';
      this.newAngle.emit(this.angle);
    }
  }

  @HostListener('mousedown', ['$event']) onGrab(event: MouseEvent) {
    this.mousePosition = event.clientY;
    this.grabbed = true;
  }

  @HostListener('mouseup') onRelease() {
    this.initState = this.angle;
    this.grabbed = false;  
  }

  @HostListener('mouseleave') onLeave() {
    this.initState = this.angle;
    this.grabbed = false;  
  }

  constructor(private elRef: ElementRef) { }

}
