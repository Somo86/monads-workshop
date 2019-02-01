import {applyCorrections, correction, getAvarage, getTotalMarks, getMarks, toPassOrFail} from './index';
import {getStudentMarks} from './studentApi';

describe('monad', () => {
  let yagamiLiterature;
  let applyCorrectionsTo;
  beforeAll(() => {
    yagamiLiterature = getStudentMarks('Yagami');
    applyCorrectionsTo = applyCorrections(
      correction,
      yagamiLiterature
    );
  });

  it('should get marks or return empty object', () => {
    expect(typeof getMarks('Yagami')['literature']).toBe('object');
    expect(typeof getMarks('Mark')['literature']).toBe('undefined');
  });

  it('should apply corrections in non null Yagami\'s literature marks', () => {
    expect(applyCorrectionsTo('literature').length).toBe(4);
  });

  it('should not throw error if subject is not registred', () => {
    expect(applyCorrectionsTo('fisics').length).toBe(0);
    expect(applyCorrectionsTo(null).length).toBe(0);
  });

  it('should calculate total and return 0 if mark doesn\'t exist', () => {
    expect(getTotalMarks(applyCorrectionsTo('literature'))).toBe(40.9);
  });

  it('should calculate total and return 0 if mark doesn\'t exist', () => {
    expect(getTotalMarks(applyCorrectionsTo('mythology'))).toBe(0);
    expect(getTotalMarks(applyCorrectionsTo(null))).toBe(0);
  });

  it('should calculate the avarage after apply corrections', () => {
    expect(getAvarage('Yagami', 'literature')).toBe(10.225);
  });

  it('should convert number marks to text marks', () => {
    expect(toPassOrFail(applyCorrectionsTo('literature'))).toContain('Pass');
    expect(toPassOrFail(applyCorrectionsTo('literature')).length).toBe(4);
  });

  it('shouldn\'t throw error if value is null', () => {
    expect(toPassOrFail(applyCorrectionsTo('fisics')).length).toBe(0);
  });
});
