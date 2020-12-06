import { getNumberOfCastlesForInputData, parseCastleInputData } from './castle-view.config';

describe('Castle View', () => {
  describe('#test input validation', () => {
    it('Should return integer array for valid input', () => {
      expect(parseCastleInputData('3,3,10,4,5,6,6,6,2,2,7')).toEqual([3, 3, 10, 4, 5, 6, 6, 6, 2, 2, 7]);
    });

    it('Should return empty array if any values are not between 1-10', () => {
      expect(parseCastleInputData('3,0,10,4,5,6,60,6,2,2,7')).toEqual([]);
    });

    it('Should return empty array if any values are not integers between 1-10', () => {
      expect(parseCastleInputData('3,3.3,10,4,5, 6,a,6,-2,2,7,')).toEqual([]);
    });

    it('Should return empty array if only one integer provided, min of 2 required', () => {
      expect(parseCastleInputData('3')).toEqual([]);
    });
  });

  describe('#test building castles', () => {
    it('Should return 6 possible castles', () => {
      expect(getNumberOfCastlesForInputData('3,3,10,4,5,6,6,6,2,2,7')).toEqual(6);
    });

    it('Should return 3 possible castles', () => {
      expect(getNumberOfCastlesForInputData('1,2,3,4,5,6,6,6,5,4,3,2,1')).toEqual(3);
    });

    it('Should return 7 possible castles', () => {
      expect(getNumberOfCastlesForInputData('10,5,1,1,7,8,6,2,4,9,9,3,3,7,7,7,9')).toEqual(7);
    });
  });
});
