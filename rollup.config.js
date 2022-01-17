/* eslint-disable import/no-default-export */
import swc from 'rollup-plugin-swc'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import shebang from 'rollup-plugin-add-shebang'
import nodeEsm from '@trigen/browserslist-config/node-esm'
import pkg from './package.json'

const extensions = ['.js', '.ts']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true
      },
      externalHelpers: true
    },
    env: {
      targets
    },
    module: {
      type: 'es6'
    },
    sourceMaps: true
  })
]

export default [
  {
    input: pkg.main,
    plugins: plugins(nodeEsm.join(', ')),
    external,
    output: {
      file: pkg.publishConfig.main,
      format: 'es',
      sourcemap: true
    }
  },
  {
    input: pkg.bin,
    plugins: [
      ...plugins(nodeEsm.join(', ')),
      shebang({
        include: '**/*'
      })
    ],
    external: _ => _.endsWith('src/index.ts') || external(_),
    output: {
      file: pkg.publishConfig.bin,
      format: 'es',
      sourcemap: true
    }
  }
]
