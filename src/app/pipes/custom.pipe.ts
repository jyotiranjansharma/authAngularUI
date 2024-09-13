import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'custom',
    standalone: true,
    pure: true
})
export default class CustomPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';
        return value.split('').reverse().join('');
    }

}
