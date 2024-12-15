import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'page',
  standalone: true,
})
export class PagePipe implements PipeTransform {
  transform(fullPageTitle: string): string {
    return fullPageTitle.split('|')[0];
  }
}
