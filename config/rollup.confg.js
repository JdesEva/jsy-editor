import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import less from 'rollup-plugin-less'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import autoprefixer from 'autoprefixer'
import copy from 'rollup-plugin-copy'

const env = process.env.NODE_ENV

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const resolveOutput = function (type) {
  const base = `/dist/jsy-editor.${type}.js`
  return {
    file: resolveFile(base),
    format: type
  }
}

export default [
  {
    input: resolveFile('/src/js/index.js'),
    output: [
      { ...resolveOutput('umd'), name: '$Editor' },
      resolveOutput('amd'),
      resolveOutput('cjs')
    ],
    external: [], // 外部依赖
    globals: {
      // react: 'React',
      // redux: 'Redux'
    },
    plugins: [
      copy({
        targets: [
          {
            src: 'src/fonts/*',
            dest: 'dist/fonts'
          }
        ],
        verbose: true,
        copyOnce: true,
        hook: 'writeBundle'
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      uglify({
        output: {
          comments: false
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
        extract: resolveFile('/dist/index.min.css'),
        modules: {
          less
        }
      })
    ]
  }
]
