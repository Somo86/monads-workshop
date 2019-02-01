import * as Monet from 'monet';
import {getStudentMarks, StudentFinalMark} from './studentApi';
import {Maybe as MaybeType} from 'monet';

type TMaybe<T> = MaybeType<T>;

const Maybe = Monet.Maybe;

export const elToMaybe = (el) => Maybe.fromNull(el);

export const getMarks = (name: string): StudentFinalMark | null => {
  return Maybe.fromNull(getStudentMarks(name)).fold({})(marks => marks);
};

export const correction = (mark) => mark + 0.5;
export const applyCorrections = (correction, marks): Function => {
  return (subject): TMaybe<number>[] => {
    const secureMarks = Maybe.fromUndefined(marks[subject]).cata(
      () => [],
      x => x
    );
    return secureMarks
      .map(el => elToMaybe(el))
      .filter(el => el.isJust())
      .map(el => el.map(correction));
  }
};

export const getTotalMarks = (correctedMarks: TMaybe<number>[]) => {
  return correctedMarks.reduce((acc, curr) => {
    return curr.cata(
      () => 0,
      x => x
    ) + acc;
  }, 0);
};

export const getAvarage = (name: string, subject: string): number => {
  const applyToYagami = applyCorrections(correction, getMarks(name));
  const correctedMarks = applyToYagami(subject);
  const totalMarks = getTotalMarks(correctedMarks);
  return totalMarks / correctedMarks.length;
};

const toText = (el: number) => (el > 5 ? 'Pass' : 'Fail');
export const toPassOrFail = (correctedMarks: TMaybe<number>[]): string[] => {
  return correctedMarks.map((Mmark: TMaybe<number>) => {
    return Mmark.map(toText).cata(
      () => 'Fail',
      x => x
    );
  });
};
