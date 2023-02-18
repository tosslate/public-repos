#!/usr/bin/env node
const { remix } = require('@tossdev/remix')
const { buildTask } = require('../dist/tasks/build')
const { serveTask } = require('../dist/tasks/serve')

remix
  .program('nexus')
  .addTask(buildTask)
  .addTask(serveTask)
  .execute()
