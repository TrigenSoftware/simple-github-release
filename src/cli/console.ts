import colors from 'picocolors'

export function warn(message: string) {
  console.warn(colors.yellow(`š” ${message}`))
}

export function link(message: string) {
  console.log(`\nš ${message}\n`)
}

export function error(message: string | Error) {
  console.error(colors.red(`š“ ${message instanceof Error ? message.message : message}`))
}
