import { curry } from 'src/fns'

class Just {
  constructor (value) {
    this._value = value
  }

  map (mapper) {
    return new Just(mapper(this._value))
  }

  equals (other) {
    return other instanceof Just && other._value === this._value
  }

  chain (mapper) {
    return mapper(this._value)
  }

  option (value) {
    return this._value
  }

  toString () {
    return `Just ${this._value}`
  }
}

class Nothing {
  toString () {
    return `Nothing`
  }

  map () {
    return this
  }

  equals (other) {
    return other instanceof Nothing
  }

  option (value) {
    return value
  }
}

const of = (value) => new Just(value)
const zero = () => new Nothing()
const safe = curry((predicate, value) => predicate(value) ? new Just(value) : new Nothing())

export const Maybe = {
  Just: (value) => new Just(value),
  Nothing: (_value) => new Nothing(),
  of, zero, safe
}
