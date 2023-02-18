#!/usr/bin/env node
const { remix } = require('@tossdev/remix')
const { archeyTask } = require('../dist/archey')
const { emojiTask } = require('../dist/emoji')
const { gitTask } = require('../dist/git')

remix
  .program('bloom')
  .addTask(archeyTask)
  .addTask(emojiTask)
  .addTask(gitTask)
  .execute()
