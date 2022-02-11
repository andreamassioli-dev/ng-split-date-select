import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, Subject, takeUntil } from "rxjs";
import { AppState } from "../../core/core.module";
import { DateActions } from '../../core/date/store/actions';
import { getDate } from "../../core/date/store/selectors";
import { SplitDate } from "../../models/split-date";

@Component({
  selector: 'app-date',
  template: `
    <app-split-date-select class="m-3" [formControl]="dateControl" (dateChange)="onDateChange($event)"></app-split-date-select>
    <app-card class="m-3" header="Selected date (from the store):">
      {{ date | json }}
    </app-card>
    <app-card class="m-3" header="Selected date (emitted):">
      {{ emittedDate | json }}
    </app-card>
  `
})
export class DateComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  date: SplitDate | null = null;
  dateControl = new FormControl(null);

  initialDate: SplitDate | null = { day: 1, month: 1, year: 2000 };
  emittedDate: SplitDate | null = null;

  constructor(private store: Store<AppState>) {
    this.store.select(getDate).subscribe(date => this.date = date);
  }

  ngOnInit(): void {
    this.dateControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((date: SplitDate | null) => this.store.dispatch(DateActions.changeDate({ date })));
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  onDateChange(date: SplitDate | null): void {
    this.emittedDate = date;
  }

}
