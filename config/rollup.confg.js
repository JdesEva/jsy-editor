import { uglify } from 'rollup-plugin-uglify'
const path = require('path')
const less = require('rollup-plugin-less')
const babel = require('rollup-plugin-babel')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')

const env = process.env.NODE_ENV

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    input: resolveFile('/src/js/index.js'),
    output: [
      {
        file: '../dist/build.umd.js',
        format: 'umd', //  五种输出格式：amd /  es6 / iife / umd / cjs
        name: '$Editor' // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
        // sourcemap: true // 生成bundle.map.js文件，方便调试
      }
    ],
    external: [], // 外部依赖
    globals: {
      // react: 'React',
      // redux: 'Redux'
    },
    plugins: [
      less(),
      babel({
        exclude: 'node_modules/**'
      }),
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      uglify()
    ]
  }
]
