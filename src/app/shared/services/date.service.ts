import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  getDaysByMonthAndYear(month: number | null, year: number | null): number {
    if (!month) {
      return 31;
    }

    // 2022 is picked as the default year as it is not a leap year
    return moment(`${ year || 2022 }-${ month }`, 'YYYY-M').daysInMonth();
  }

}
