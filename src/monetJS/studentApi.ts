export type StudentMarks = {
  math?: number[];
  literature?: number[];
  ethics?: number[];
  mythology?: number[];
  others?: number[];
}

export type StudentFinalMark = {
  math?: number;
  literature?: number;
  ethics?: number;
  mythology?: number;
  others?: number;
}

export function getStudentMarks(name: string): StudentMarks | null {
  if (name === 'Yagami') {
    return {
      math: [10, 9, 10, 9.8, null],
      literature: [9.5, null, 9.9, 9.7, 9.8, null],
      ethics: [10, null, 7, 4, 1, null],
      mythology: [null, null, null, null, null, null],
      others: null,
    };
  } else {
    return null;
  }
}

export function getStudentFinalExamMarks(name: string): StudentFinalMark | null {
  if (name === 'Yagami') {
    return {
      math: 10,
      literature: 10,
      ethics: null,
      mythology: 10,
      others: undefined,
    };
  } else {
    return null;
  }
}
