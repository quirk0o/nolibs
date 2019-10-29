import { curry } from './fn'
import { complement } from './ops'

export const empty = (string) => string.length === 0
export const notEmpty = complement(empty)

export const startsWith = curry((substr, string) => string.startsWith(substr))

export const prepend = curry((prefix, string) => `${prefix}${string}`)

export const replace = curry((regex, replacement, string) => string.replace(regex, replacement))

export const split = curry((token, string) => string.split(token))

export const join = curry((token, string) => string.join(token))
