import path from 'path'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

export default {
  input: resolveFile('/src/main.js'),
  external: [], // 外部依赖
  globals: {
    // react: 'React',
    // redux: 'Redux'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      browser: true // Default: false
    }),
    commonjs({ include: /node_modules/ }),
    nodeGlobals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}
