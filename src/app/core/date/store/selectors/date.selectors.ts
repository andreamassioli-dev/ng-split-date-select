import { AppState } from "../../../core.module";

export const getDate = (state: AppState) => state.date.date;
