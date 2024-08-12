import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], id: string): any[] {
    if (!items) return [];
    if (!id) return items;

    return items.filter((item) =>
      item.id.toLowerCase().includes(id.toLowerCase())
    );
  }
}
