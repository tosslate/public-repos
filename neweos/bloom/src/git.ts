import { getGitConfig, execute, invoke } from './utils'
import { defineTask, remix } from '@tossdev/remix'

async function resetGitInfo() {
  const config = getGitConfig()
  const { trash } = await remix.prompt([
    { name: 'trash', type: 'confirm', message: 'trash .git' }
  ])

  if (!trash) { process.exit(0) }

  await execute('trash .git')
  await execute('git init')

  await invoke(`git config user.name "${config.user.name}"`)
  await invoke(`git config user.email "${config.user.email}"`)
  await invoke(`git remote add origin ${config['remote "origin"'].url}`)
}

async function resetCommits() {
  await invoke('mkdir @repository')
  await invoke('mv .git @repository')
  await invoke('git -C @repository add .')
  await invoke('git -C @repository commit -m "reset repository"')
  await invoke('mv @repository/.git .')
  await invoke('trash @repository')
}

export const gitTask = defineTask({
  name: 'git',
  about: 'Git tasks',
  handler(args, opts) {
    async function runTask() {
      switch (args[1]) {
        case 'rework':
          await resetGitInfo()
          break
        case 'reset-commits':
          await resetCommits()
          break
        default:
          break
      }
    }

    runTask().catch(console.error)
  }
})
