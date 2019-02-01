import Maybe from './monads-class/Maybe';

//MAP M(a) -> M(b)
const multiply = v => v * 3;
{
  const example = Maybe.of(3).map(multiply);
  console.log(example); // M(9)
}


//JOIN M(a) -> a
{
  const example = Maybe.of(3).join();
  console.log(example); // 3
}

//CHAIN M(M(a)) -> M(b) join + map
{
  const example = Maybe.of(Maybe.of(3)).chain(multiply);
  console.log(example); // M(9)
}

