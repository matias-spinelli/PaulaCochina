import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]',
  standalone: false
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''
  @HostListener('error') handleError():void {
    const elNative = this.elHost.nativeElement
    console.log('ERROR',this.elHost);
    elNative.src = this.customImg
  }
  constructor(private elHost:ElementRef) { }

}
