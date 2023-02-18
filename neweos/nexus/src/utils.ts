import { copySync, outputFileSync } from 'fs-extra'
import * as strings from './helpers/strings'

const __App__ = `export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}`

const __404__ = `export default function __404__() {
  return (
    <div>
      <h1>404</h1>
      <p>This page could not be found</p>
    </div>
  )
}`

export function copyPage(path: string) {
  const file = strings.file(path)
  copySync(path, file.replace(/^\./, '.nexus'))
}

export function outputAppComponent() {
  outputFileSync('.nexus/app.tsx', __App__)
}

export function outputNotFoundComponent() {
  outputFileSync('.nexus/404.tsx', __404__)
}
