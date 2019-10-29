import { curry } from './fn'

export const allPass = curry((predicates, arg) => predicates.reduce((pass, pred) => pass && pred(arg)), true)
export const both = curry((a, b) => (...args) => a(...args) && b(...args))
