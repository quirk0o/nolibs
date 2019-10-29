export const isFunction = (maybeFn) => {
  return maybeFn && {}.toString.call(maybeFn) === '[object Function]'
}
