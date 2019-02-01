import * as Monet from 'monet';
import {getStudentMarks, StudentFinalMark} from './studentApi';
import {Maybe as MaybeType} from 'monet';

type TMaybe<T> = MaybeType<T>;

const Maybe = Monet.Maybe;

export const getMarks = (name: string): StudentFinalMark | null => {

};

export const correction = (mark) => mark + 0.5;
export const applyCorrections = (correction, marks): Function => {
  return (subject): TMaybe<number>[] => {

};

export const getTotalMarks = (correctedMarks: TMaybe<number>[]) => {

};

export const getAvarage = (name: string, subject: string): number => {

};

const toText = (el: number) => (el > 5 ? 'Pass' : 'Fail');
export const toPassOrFail = (correctedMarks: TMaybe<number>[]): string[] => {

};
