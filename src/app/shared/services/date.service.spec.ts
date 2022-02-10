import { DateService } from "./date.service";

describe('DateService', () => {
  describe('getDaysByMonthAndYear', () => {
    let service: DateService;

    beforeEach(() => {
      service = new DateService()
    });

    it('should be created', () => {
      expect(service).toBeTruthy()
    });

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
      expect(service.getDaysByMonthAndYear(2, 2022)).toEqual(28);
    });

    it('should return 29 if month is 2 and the year is a leap year', () => {
      expect(service.getDaysByMonthAndYear(2, 2020)).toEqual(29);
    });
  })
})
