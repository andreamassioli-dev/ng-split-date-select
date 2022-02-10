import * as moment from 'moment';
import { DateService } from "./date.service";

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    service = new DateService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  });

  describe('getDaysByMonthAndYear', () => {
    it('should return 31 if month and year are null', () => {
      expect(service.getDaysByMonthAndYear(null, null)).toEqual(31)
    });

    it('should return 31 if month is 1, 3, 5, 7, 8, 10 or 12', () => {
      expect(service.getDaysByMonthAndYear(1, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(3, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(5, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(7, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(8, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(10, null)).toEqual(31);
      expect(service.getDaysByMonthAndYear(12, null)).toEqual(31);
    });

    it('should return 30 if month is 4, 6, 9 or 11', () => {
      expect(service.getDaysByMonthAndYear(4, null)).toEqual(30);
      expect(service.getDaysByMonthAndYear(6, null)).toEqual(30);
      expect(service.getDaysByMonthAndYear(9, null)).toEqual(30);
      expect(service.getDaysByMonthAndYear(11, null)).toEqual(30);
    });

    it('should return 28 if month is 2 and the year is not a leap year', () => {
      expect(service.getDaysByMonthAndYear(2, 2018)).toEqual(28);
    });

    it('should return 29 if month is 2 and the year is a leap year', () => {
      expect(service.getDaysByMonthAndYear(2, 2020)).toEqual(29);
    });

    it('should return 31 if the month is null and the year is the current year', () => {
      const date = moment();
      expect(service.getDaysByMonthAndYear(null, date.year())).toEqual(31);
    });

    it('should return the days until today if the month is the current month and the year is the current year', () => {
      const date = moment();
      expect(service.getDaysByMonthAndYear(date.month() + 1, date.year())).toEqual(date.date());
    });
  });

  describe('getMonthsByYear', () => {
    it('should return 12 if the year is null', () => {
      expect(service.getMonthsByYear(null)).toEqual(12);
    });
    it('should return 12 if the year is prior to the current year', () => {
      expect(service.getMonthsByYear(2021)).toEqual(12);
    });
    it('should return the current month if the year is the current year', () => {
      const date = moment();
      expect(service.getMonthsByYear(date.year())).toEqual(date.month() + 1);
    });
  })
})
