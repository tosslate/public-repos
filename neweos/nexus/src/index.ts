import { copyPage, outputAppComponent, outputNotFoundComponent } from './utils'
import { outputNexusJS } from './helpers/nexus'
import { outputHtml } from './helpers/html'
import { pathExistsSync } from 'fs-extra'
import { getPaths, page } from './page'
import chokidar from 'chokidar'

function addCallback(path: string) {
  copyPage(path)
  page.addRoute(path)
  outputNexusJS(page.routes())
}

function changeCallback(path: string) {
  copyPage(path)
}

function unlinkCallback(path: string) {
  page.removeRoute(path)
  outputNexusJS(page.routes())
}

export async function watch() {
  chokidar
    .watch('pages/**/*.{tsx,jsx}')
    .on('add', addCallback)
    .on('change', changeCallback)
    .on('unlink', unlinkCallback)
}

export async function setup() {
  const paths = getPaths()

  for (const path of paths) {
    copyPage(path)
  }

  outputNexusJS(page.routes())

  if (!pathExistsSync('index.html')) {
    outputHtml()
  }

  if (!pathExistsSync('.nexus/app.tsx')) {
    outputAppComponent()
  }

  if (!pathExistsSync('.nexus/404.tsx')) {
    outputNotFoundComponent()
  }
}
