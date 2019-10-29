import { curry } from './fn'

export const fromPairs = (pairs) => {
  const obj = {}
  for (let [key, value] of pairs) {
    obj[key] = value
  }
  return obj
}

export const toPairs = Object.entries

export const prop = curry((key, obj) => obj[key])

export const isObject = (maybeObj) => {
  const type = typeof maybeObj
  return type === 'function' || type === 'object' && !!maybeObj
}

export const merge = curry((o1, o2) => Object.assign(o2, o1))
