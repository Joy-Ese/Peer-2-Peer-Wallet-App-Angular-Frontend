import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
  
    const arr = items.filter(item => this.getSome(item, searchText));
    return arr;
  }


  getSome(item: any, searchText: string){
    const returnVal = Object.keys(item).some(key => {
      const val = String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      return val;
    });
    return returnVal;
  }
}