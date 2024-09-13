import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export default class HighlightDirective {

    @Input() appHighlight = '';

    constructor(private el: ElementRef) {}
    // ElementRef refers to an element of the DOM, whereas TemplateRef represents an embedded template (usually a component template). 
    // So to summarize, the template ref can contain several element refs, but the element ref can not contain a template ref.
  
    @HostListener('mouseenter') onMouseEnter() {
      this.highlight(this.appHighlight || '#eee');
    }
  
    @HostListener('mouseleave') onMouseLeave() {
      this.highlight('');
    }
  
    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }

}