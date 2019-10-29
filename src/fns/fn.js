export const identity = x => x

export const curry = (fn) => {
  return function currify (...args) {
    return args.length >= fn.length
      ? fn(...args)
      : currify.bind(null, ...args)
  }
}

export const apply = (fn) => (args) => fn.apply(null, args)
export const applyTo = curry((args, fn) => fn.apply(null, args))

export const pipe = (...fns) => (arg) => fns.reduce((returnValue, fn) => fn(returnValue), arg)

export const lift = (fn) => (...aps) => (...args) => fn(...aps.map(ap => ap.apply(null, args)))
