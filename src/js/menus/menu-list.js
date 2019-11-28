/*
    所有菜单的汇总
*/

// 存储菜单的构造函数
import Bold from './bold/index.js'

import Head from './head/index.js'

import FontSize from './fontSize/index.js'

import FontName from './fontName/index.js'

import Link from './link/index.js'

import Italic from './italic/index.js'

import Redo from './redo/index.js'

import StrikeThrough from './strikethrough/index.js'

import Underline from './underline/index.js'

import Undo from './undo/index.js'

import List from './list/index.js'

import Justify from './justify/index.js'

import ForeColor from './foreColor/index.js'

import BackColor from './backColor/index.js'

import Quote from './quote/index.js'

import Code from './code/index.js'

import Emoticon from './emoticon/index.js'

import Table from './table/index.js'

import Video from './video/index.js'

import Image from './img/index.js'

const MenuConstructors = {}
MenuConstructors.bold = Bold
MenuConstructors.head = Head
MenuConstructors.fontSize = FontSize
MenuConstructors.fontName = FontName
MenuConstructors.link = Link
MenuConstructors.italic = Italic
MenuConstructors.redo = Redo
MenuConstructors.strikeThrough = StrikeThrough
MenuConstructors.underline = Underline
MenuConstructors.undo = Undo
MenuConstructors.list = List
MenuConstructors.justify = Justify
MenuConstructors.foreColor = ForeColor
MenuConstructors.backColor = BackColor
MenuConstructors.quote = Quote
MenuConstructors.code = Code
MenuConstructors.emoticon = Emoticon
MenuConstructors.table = Table
MenuConstructors.video = Video
MenuConstructors.image = Image

// 吐出所有菜单集合
export default MenuConstructors
