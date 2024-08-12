import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gendersearch',
})
export class GendersearchPipe implements PipeTransform {
  transform(items: any[], gender: string): any[] {
    if (!items) return [];
    if (!gender) return items;

    return items.filter(
      (item) => item.gender.toLowerCase() === gender.toLowerCase()
    );
  }
}
