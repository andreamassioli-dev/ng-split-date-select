import { createReducer, on } from "@ngrx/store";
import { SplitDate } from "../../../../models/split-date";
import { DateActions } from "../actions";

export interface DateState {
  date: SplitDate | null;
}

export const initialState: DateState = {
  date: null
}

export const dateReducer = createReducer(
  initialState,
  on(DateActions.changeDate, (state, { date }) => ({ ...state, date }))
);
