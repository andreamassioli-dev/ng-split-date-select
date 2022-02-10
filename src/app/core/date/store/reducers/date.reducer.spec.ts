import { fromDate } from "."
import { DateActions } from "../actions";

describe('dateReducer', () => {
  describe('unhandled action', () => {
    it('should return the default state', () => {
      const initialState = fromDate.initialState;
      const action = {
        type: 'An Unhandled action'
      };
      const newState = fromDate.dateReducer(initialState, action);

      expect(newState).toBe(initialState);
    })
  }),
    describe('changeDate', () => {
      it('should set the date to null', () => {
        const initialState = fromDate.initialState;
        const expectedState = { date: null };
        const action = DateActions.changeDate({ date: null });
        const state = fromDate.dateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(expectedState);
      })
    }),
    describe('changeDate', () => {
      it('should set the date to a SplitDate', () => {
        const initialState = fromDate.initialState;
        const date = { day: 0, month: 0, year: 0 };
        const expectedState = { date };
        const action = DateActions.changeDate({ date });
        const state = fromDate.dateReducer(initialState, action);

        expect(state).toEqual(expectedState);
        expect(state).not.toBe(expectedState);
      })
    })
})
