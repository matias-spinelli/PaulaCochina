import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeartAnimate]',
  standalone: false
})
export class HeartAnimateDirective {

  constructor(private el: ElementRef) {}

  @HostListener('click')
  animate() {
    const element = this.el.nativeElement;
    element.classList.add('animate-heart');

    element.addEventListener('animationend', () => {
      element.classList.remove('animate-heart');
    }, { once: true });
  }
}