import HighlightDirective from './highlight.directive';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
    template: `<div appHighlight="yellow" id="testElement"></div>`
})
class TestComponent { }

fdescribe('HighlightDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: HighlightDirective;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HighlightDirective, TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        element = fixture.nativeElement.querySelector('#testElement');
        directive = new HighlightDirective(new ElementRef(element));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should highlight with the specified color on mouse enter', () => {
        directive.onMouseEnter();
        expect(element.style.backgroundColor).toBe('yellow');
    });

    it('should highlight with the default color on mouse enter if no color is specified', () => {
        directive.appHighlight = '';
        directive.onMouseEnter();
        expect(element.style.backgroundColor).toBe('#eee');
    });

    it('should remove highlight on mouse leave', () => {
        directive.onMouseEnter();
        expect(element.style.backgroundColor).toBe('yellow');

        directive.onMouseLeave();
        expect(element.style.backgroundColor).toBe('');
    });
});