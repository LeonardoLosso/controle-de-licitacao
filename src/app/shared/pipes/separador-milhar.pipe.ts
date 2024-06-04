import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'separadorMilhar'
})
export class SeparadorMilharPipe implements PipeTransform {

    transform(value: number | string): string {
        if (typeof value === 'number') {
            return value.toString();
        }
        return value.replace(/,/g, '');
    }

}
