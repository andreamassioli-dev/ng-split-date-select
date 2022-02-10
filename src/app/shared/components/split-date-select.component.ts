import {
  ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostBinding, Input, Output
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { distinctUntilChanged, pairwise, startWith } from "rxjs";
import { SplitDate } from "../../models/split-date";
import { DateService } from "../services/date.service";

@Component({
  selector: 'app-split-date-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SplitDateSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="d-flex w-100" [formGroup]="dateForm">
      <select class="form-select flex-fill mx-1" [formControl]="dayControl">
        <option [ngValue]="null">Day</option>
        <option *ngFor="let availableDay of availableDays" [ngValue]="availableDay">{{ availableDay }}</option>
      </select>
      <select class="form-select flex-fill mx-1" [formControl]="monthControl">
        <option [ngValue]="null">Month</option>
        <option *ngFor="let availableMonth of availableMonths" [ngValue]="availableMonth">
          {{ availableMonth | monthName }}
        </option>
      </select>
      <select class="form-select flex-fill mx-1" [formControl]="yearControl">
        <option [ngValue]="null">Year</option>
        <option *ngFor="let availableYear of availableYears" [ngValue]="availableYear">{{ availableYear }}</option>
      </select>
    </div>
  `
})
export class SplitDateSelectComponent implements ControlValueAccessor {

  @Output() dateChange = new EventEmitter<SplitDate | null>();

  @HostBinding('style') style = 'display: block';

  readonly START_YEAR = 1900;

  private lastValue?: SplitDate | null;

  availableDays: number[] = this.fromLength(31);
  availableMonths: number[] = this.fromLength(12);
  availableYears: number[] = new Array(new Date().getFullYear() - this.START_YEAR + 1)
    .fill(null)
    .map((_, i) => this.START_YEAR + i)
    .reverse();

  dateForm = this.formBuilder.group({
    day: [ null ],
    month: [ null ],
    year: [ null ]
  });

  get dayControl(): FormControl {
    return this.dateForm.get('day') as FormControl;
  }

  get monthControl(): FormControl {
    return this.dateForm.get('month') as FormControl;
  }

  get yearControl(): FormControl {
    return this.dateForm.get('year') as FormControl;
  }

  onChange = (value: SplitDate | null) => {};
  onTouched = () => {};

  constructor(private dateService: DateService, private formBuilder: FormBuilder) {
    this.reactToDateChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: SplitDate | null): void {
    this.dayControl.patchValue(value?.day || this.dayControl.value, { emitEvent: false });
    this.monthControl.patchValue(value?.month || this.monthControl.value, { emitEvent: false });
    this.yearControl.patchValue(value?.day || this.yearControl.value, { emitEvent: false });
  }

  private reactToDateChanges(): void {
    this.dateForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.refreshDaysByMonthAndYear();

      const formValue = this.dateForm.value;
      const value = (formValue.day && formValue.month && formValue.year) ? formValue : null;

      if (value !== this.lastValue) {
        this.updateDate(value);
        this.lastValue = value;
      }
    });
  }

  private refreshDaysByMonthAndYear(): void {
    const month = this.monthControl.value;
    const year = this.yearControl.value;
    const newAvailableDays = this.dateService.getDaysByMonthAndYear(month, year);

    if (newAvailableDays != this.availableDays.length) {
      this.availableDays = this.fromLength(newAvailableDays);

      if (this.dayControl.value > newAvailableDays) {
        this.dayControl.patchValue(null, { emitEvent: false });
      }
    }
  }

  private updateDate(date: SplitDate | null): void {
    this.onChange(date);
    this.dateChange.emit(date);
  }

  private fromLength(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

}
