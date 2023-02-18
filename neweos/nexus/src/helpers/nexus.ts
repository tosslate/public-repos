import { outputFileSync } from 'fs-extra'
import mustache from 'mustache'

const template = `import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NexusApp from './app'
import Nexus404 from './404'
{{#routes}}
import {{component}} from '{{{file}}}'
{{/routes}}

ReactDOM.render(<NexusApp Component={() => {
  return (
    <Router>
      <Switch>
        {{#routes}}
        {{=<% %>=}}
        <Route exact path="<%& pattern %>" component={<% component %>} />
        <%={{ }}=%>
        {{/routes}}
        <Route path="*" component={Nexus404} />
      </Switch>
    </Router>
  )
}} />, document.getElementById('nexus'))`

export type Route = {
  file: string
  depth: number
  pattern: string
  component: string
}

export function outputNexusJS(routes: Route[]) {
  const data = mustache.render(template, { routes })
  outputFileSync(`${process.cwd()}/.nexus/main.tsx`, data)
}
