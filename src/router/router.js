import { Maybe } from 'src/adts/maybe'
import {
  both,
  curry,
  filter,
  fromPairs,
  join,
  count,
  map,
  notEmpty,
  notNil,
  pipe,
  prepend,
  reject,
  replace,
  split,
  startsWith,
  zip
} from 'src/fns'

const pathFragments = pipe(split('/'), filter(notEmpty))
const isParamFragment = startsWith(':')
const staticFragments = pipe(pathFragments, reject(isParamFragment))
const paramsFragments = pipe(pathFragments, filter(isParamFragment))

const staticPath = pipe(staticFragments, join('/'), prepend('/'))
const dynamicParams = curry((path, currentPath) => pipe(replace(path, ''), pathFragments)(currentPath))
const pathParamNames = pipe(paramsFragments, map(replace(':', '')))

const pathMatches = (path, params) => both(
  startsWith(path),
  (currentPath) => pipe(dynamicParams(path), count)(currentPath) === params.length
)

const paramsMapping = (paramNames, currentParams) => fromPairs(zip(paramNames, currentParams))

export class Router {
  #routes = []

  route (path, middleware) {
    this.#routes.push({ path: staticPath(path), params: pathParamNames(path), middleware })
  }

  resolve ({ pathname: currentPath, searchParams }) {
    return Maybe
      .safe(notNil, this.#routes.find(({ path, params }) => pathMatches(path, params)(currentPath)))
      .map(({ path, params, middleware }) => middleware({
        path, searchParams, params: paramsMapping(params, dynamicParams(path, currentPath))
      }))
  }
}
