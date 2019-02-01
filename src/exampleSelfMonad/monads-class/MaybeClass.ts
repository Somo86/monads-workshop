interface MaybePatterns<T, U> {
  right: (t: T) => U;
  left: () => U;
}

class Maybe<T>{
  private __type: string;
  private __value: any;

  constructor(val: any) {
    this.__type = 'maybe';
    this.__value = val;
  }

  static of<T>(val: T): Maybe<T> {
    return new Maybe(val);
  }

  static just<T>(val: T): Maybe<T> {
    return new Maybe(val);
  }

  static nothing(): Maybe<null | undefined> {
    return new Maybe(null);
  }

  public isNothing(): boolean {
    return (this.__value === null || this.__value === undefined);
  }

  public isJust(): boolean {
    return (this.__value !== null || this.__value !== undefined);
  }

  public map(f) {
    return this.isNothing()
      ? Maybe.nothing()
      : Maybe.just(f(this.__value));
  }

  private isMaybeType(M): boolean {
    return M instanceof Maybe;
  }

  public deep() {
    if (this.isNothing()) {
      return Maybe.nothing();
    }
    if (this.isMaybeType(this.__value)) {
      return this.__value.deep();
    }
    return this;
  }

  public fmap(f: Function): Maybe<T> {
    if (this.isNothing()) {
      return Maybe.of(null);
    }
    return this.fMonad().map(f);
  }

  public ap<U>(someOtherMaybe: Maybe<T>): Maybe<U>  {
    if(this.isNothing()) return Maybe.nothing();
    return someOtherMaybe.map(this.__value);
  }

  public getOrElse(def: any): Maybe<T> {
    return this.isNothing()
      ? Maybe.of(def)
      : this
  }

  public flatten(): T {
    return this.__value;
  }

  public fMonad(): Maybe<T> {
    return this.__value;
  }

  public cata<U>(patterns: MaybePatterns<T,U>): U {
    return this.isJust()
      ? patterns.right(this.__value)
      : patterns.left();
  }
}

export default Maybe;
