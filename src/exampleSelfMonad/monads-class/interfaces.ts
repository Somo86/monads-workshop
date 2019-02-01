export interface Monad<T> {
  //unit<U>(t: U): Monad<U>;
  //bind<U>(f: (t: T) => Monad<U>): Monad<U>;
  of<U>(t: U): Monad<U>;
  chain<U>(f: (t: T) => Monad<U>): Monad<U>;
}
export interface Functor<T> {
  fmap<U>(f: (t: T) => U): Functor<U>;
  lift<U>(f: (t: T) => U): Functor<U>;
  map<U>(f: (t: T) => U): Functor<U>;
}

export interface Statics<T> {
  isNothing<T>(): boolean;
  isJust<T>(): boolean
}
