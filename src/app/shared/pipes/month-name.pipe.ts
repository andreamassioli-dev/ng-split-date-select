import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(month: number): string | null {
    return this.datePipe.transform(new Date(0, month, 0), 'MMMM');
  }

}
