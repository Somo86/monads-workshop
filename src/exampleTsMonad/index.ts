//import * as Maybe from "maybe.ts";
import {maybe, Maybe} from 'tsmonad';

const user = {
  name: 'Albert',
  age: 32,
  marks: [1,4,3,7,8,5,9,10]
};

const multiply = x => x * 3;
const sum = (acc, curr) => {
  return curr.caseOf({
    just: x => acc + x,
    nothing: () => acc
  });
};
const odd = x => {
 return x % 2 === 0 ? Maybe.just(x) : Maybe.nothing();
};

const mget = (obj) => (prop) => typeof obj[prop] === 'object' ? MarrayToM(obj[prop])  :  MToM(obj[prop]);
const mgetUser = mget(user);
const MarrayToM = val => val.map(el => Maybe.maybe(el));
const MToM = el => Maybe.maybe(el);

const Mmname = mgetUser('name').caseOf({
  just: val => val,
  nothing: () => false
});

const Mmarks: Maybe<number>[] = mgetUser('marks');

const Mmultiply = Mmarks
  .map(Mmark => Mmark.map(multiply))
  .filter(Mmark => Maybe.isJust(Mmark.chain(odd)))
  .reduce(sum, 0);
console.log(Mmarks, Mmultiply);
