import { exec } from 'child_process'
import { bold, green } from 'chalk'
import { readFileSync } from 'fs'
import { promisify } from 'util'
import { parse } from 'ini'

function readFile(path: string) {
  return readFileSync(path, 'utf8')
}

export function getGitConfig() {
  return parse(readFile(`${process.cwd()}/.git/config`))
}

export const execute = promisify(exec)

export async function invoke(command: string) {
  console.log(`${green('>')} ${bold(command)}`)
  const { stdout, stderr } = await execute(command)

  if (stdout) { process.stdout.write(stdout) }
  if (stderr) { console.error(stderr) }
}
