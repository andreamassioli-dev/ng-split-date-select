import { createAction, props } from "@ngrx/store";
import { SplitDate } from "../../../../models/split-date";

export const changeDate = createAction(
  '[Date] Change',
  props<{ date: SplitDate | null }>()
);
