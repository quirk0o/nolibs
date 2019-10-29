import { curry, pipe } from './fn'
import { fromPairs, toPairs } from './object'
import { complement } from './ops'
import { isFunction } from './type'

export const reduce = curry((reducer, initial, arr) => arr.reduce(reducer, initial))

export const zip = curry((a1, a2) => a1.slice(0, a2.length).map((item, idx) => [item, a2[idx]]))

export const filter = curry((predicate, arr) => isFunction(arr.filter)
  ? arr.filter(predicate)
  : pipe(
    toPairs,
    filter(([, value]) => predicate(value)),
    fromPairs
  )(arr)
)

export const reject = curry((predicate, arr) => arr.filter(complement(predicate)))

export const map = curry((mapper, arr) => isFunction(arr.map)
  ? arr.map(mapper)
  : pipe(
    toPairs,
    map(([key, value]) => [key, mapper(value)]),
    fromPairs
  )(arr)
)

export const count = (arr) => arr.length

export const find = curry((predicate, arr) => arr.find(predicate))

export const groupBy = curry((accessor, arr) => reduce(
  (obj, item) => {
    const key = accessor(item)
    obj[key] ? obj[key].push(item) : obj[key] = [item]
    return obj
  }, {}, arr))

export const concat = curry((a1, a2) => a2.concat(a1))
