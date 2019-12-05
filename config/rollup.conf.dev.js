import base from './rollup'
import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import simplevars from 'postcss-simple-vars'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

const resolveOutput = function (type) {
  const base = `/lib/jsy-editor.${type}.js`
  return {
    file: resolveFile(base),
    format: type
  }
}

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

// 开启服务
const plugins = [
  postcss({
    plugins: [
      simplevars(),
      nested(),
      cssnext({ warnForDuplicates: false }),
      cssnano(),
      autoprefixer()
    ],
    extensions: ['.css']
  }),
  serve({
    open: true, // 是否打开浏览器
    contentBase: './',
    historyApiFallback: true, // Set to true to return index.html instead of 404
    host: 'localhost',
    port: 3003
  }),
  livereload({
    verbose: true,
    watch: ['lib', 'src']
  })
]

base.output = [{ ...resolveOutput('iife'), name: '$Editor' }]

base.plugins = [...base.plugins, ...plugins]

export default base
