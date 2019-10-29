import { curry, filter, map, merge, notNil, pipe, prop, reduce } from 'src/fns'

export const DateFormatPart = {
  Year: 'Y',
  Month: 'M',
  Day: 'D'
}

const pattern = /(?<year>Y+)|(?<month>M+)|(?<day>D+)/g

export const format = curry((format, date) => {
  const groups = pipe(
    map(prop('groups')),
    map(filter(notNil)),
    reduce(merge, {}),
  )(Array.from(format.matchAll(pattern)))

  const year = date.getFullYear().toString()
  const month = date.getMonth().toString()
  const day = date.getDate().toString()

  format.replace(pattern, (...args) => console.log(args))
})
