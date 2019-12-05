import Editor from './editor/index.js'

// 检验是否浏览器环境
if (typeof window === 'undefined') throw new Error('请在浏览器环境下运行')

// 返回
export default Editor
