import camelCase from 'lodash/camelCase'

export function file(path: string) {
  return path.replace(/^pages/, '.').replace(/[\[\]]/g, '_')
}

export function depth(path: string) {
  return path.split('/').length
}

export function pattern(path: string) {
  return (
    path
      .replace(/^pages/, '')
      .replace(/\.tsx$/, '')
      .replace(/\/index$/, '')
      .replace(/\[([_a-z]+)\]/g, ':$1') || '/'
  )
}

export function component(path: string) {
  return camelCase(path.replace(/[\[\]\-\/\.]/g, '_'))
}
