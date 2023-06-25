import path from 'node:path'
import fs from 'fs-extra'
import { consola } from 'consola'

export async function create() {
  try {
    await fs.emptyDir(path.resolve(process.cwd(), './template-react-ts'))
  }
  catch (err) {
    consola.error(err)
  }
}

export async function copy(tempPath: string) {
  await create()
  return fs.copy(tempPath, path.resolve(process.cwd(), './template-react-ts'))
}

export async function isExists(path: string) {
  return await fs.pathExists(path)
}

export async function remove(path: string) {
  try {
    await fs.remove(path)
  }
  catch (err) {
    consola.error(err)
  }
}

/**
 * move file
 * @param srcPath
 * @param path
 * @returns
 */
export async function move(srcPath: string, path: string) {
  if (await isExists(path)) {
    consola.warn('The file already exists, please delete it first')
    return
  }

  try {
    await fs.move(srcPath, path)
    consola.warn('success!')
  }
  catch (err) {
    consola.error(err)
  }
}

export enum ConfigEnum {
  plugins = 'plugins',
  config = 'config',
}

const configPath = path.resolve(__dirname, '../../cli.config.json')
const pluginConfigPath = path.resolve(__dirname, '../../plugin.config.json')

/**
 * read config json file
 * @returns
 */
export function readJsonFile(type: ConfigEnum) {
  const currentPath = type === ConfigEnum.plugins ? pluginConfigPath : configPath
  const data = fs.readFileSync(currentPath, 'utf8')

  try {
    return JSON.parse(data)
  }
  catch (error) {
    consola.error(error)
    return {}
  }
}

/**
 * write config json file
 * @param data
 */
export function writeJsonFile(data: any, type: ConfigEnum) {
  const currentPath = type === ConfigEnum.plugins ? pluginConfigPath : configPath
  try {
    fs.writeFileSync(currentPath, JSON.stringify({
      ...readJsonFile(type),
      plugins: data,
    }, null, 2), 'utf8')
  }
  catch (error) {
    consola.error(error)
  }
}
