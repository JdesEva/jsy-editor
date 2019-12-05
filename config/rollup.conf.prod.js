import base from './rollup'
import path from 'path'
import { uglify } from 'rollup-plugin-uglify'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import simplevars from 'postcss-simple-vars'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const resolveOutput = function (type) {
  const base = `/lib/jsy-editor.${type}.js`
  return {
    file: resolveFile(base),
    format: type
  }
}

const plugins = [
  uglify({
    sourcemap: false,
    compress: {
      drop_console: true // 去除console 生产模式建议关闭
    }
  }),
  postcss({
    plugins: [
      simplevars(),
      nested(),
      cssnext({ warnForDuplicates: false }),
      cssnano(),
      autoprefixer()
    ],
    extensions: ['.css'],
    extract: resolveFile('/lib/index.min.css')
  })
]

base.output = [
  { ...resolveOutput('umd'), name: '$Editor' },
  resolveOutput('amd'),
  resolveOutput('cjs')
]

base.plugins = [...base.plugins, ...plugins]

export default base
