import { curry } from './fn'
import { isFunction } from './type'

export const complement = (fn) => (...args) => !fn(...args)

export const equals = curry((a, b) => isFunction(a.equals) ? a.equals(b) : a === b)

export const always = (x) => () => x

export const nil = (x) => x === null || typeof x === 'undefined'
export const notNil = complement(nil)

export const tap = curry((fn, value) => {
  fn.call(null, value)
  return value
})
