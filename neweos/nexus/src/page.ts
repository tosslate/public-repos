import type { Route } from './helpers/nexus'
import * as strings from './helpers/strings'
import { copyFileSync } from 'fs-extra'
import sortBy from 'lodash/sortBy'
import glob from 'fast-glob'

class Page {
  private _routes: Route[] = []

  constructor(paths: string[]) {
    for (const path of paths) {
      this.addRoute(path)
    }
  }

  routes() {
    return sortBy(this._routes, ['depth', 'file']).filter(
      ({ file }) => !/[404|app]\.tsx$/.test(file)
    )
  }

  addRoute(path: string) {
    this.removeRoute(path)
    this._routes.push({
      file: strings.file(path),
      depth: strings.depth(path),
      pattern: strings.pattern(path),
      component: strings.component(path)
    })
  }

  removeRoute(path: string) {
    const file = strings.file(path)
    this._routes = this._routes.filter((route) => route.file != file)
  }
}

export function getPaths() {
  return glob.sync('pages/**/*.{tsx,jsx}')
}

export const page = new Page(getPaths())
