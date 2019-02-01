
const Maybe = function(val) {
  this.__type = 'maybe';
  this.__value = val;
};

Maybe.prototype.of = function(val) {
  return new Maybe(val);
};

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  if (this.isNothing()) {
    return Maybe.prototype.of(null);
  }
  return Maybe.prototype.of(f(this.__value));
};

Maybe.prototype.join = function() {
  return this.__value;
};

Maybe.prototype.childIsMaybe = function(M) {
  return typeof M === 'object' && M.__type === 'maybe';
};

Maybe.prototype.deep = function() {
  if (this.isNothing()) {
    return Maybe.prototype.of(null);
  }
  if (this.childIsMaybe(this.__value)) {
    return this.__value.deep();
  }
  return this;
};

Maybe.prototype.chain = function(f) {
  if (this.isNothing()) {
    return Maybe.prototype.of(null);
  }
  return this.join().map(f);
};

Maybe.prototype.orElse = function(def) {
  if (this.isNothing()) {
    return Maybe.prototype.of(def);
  }

  return this;
};

Maybe.prototype.ap = function(someOtherMaybe) {
  return someOtherMaybe.map(this.__value);
};

export default new Maybe(null);
