/*
    menu - link
*/
import $ from '../../util/dom-core.js'
import { getRandom, __guid } from '../../util/util.js'
import Panel from '../panel.js'

// 构造函数
function Link (editor) {
  this.editor = editor
  this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>')
  this.type = 'panel'

  // 当前是否 active 状态
  this._active = false
}

const alert = window.alert

// 原型
Link.prototype = {
  constructor: Link,

  // 点击事件
  onClick: function (e) {
    const editor = this.editor
    let $linkelem

    if (this._active) {
      // 当前选区在链接里面
      $linkelem = editor.selection.getSelectionContainerElem()
      console.log($linkelem)
      if (!$linkelem) {
        return
      }
      // 将该元素都包含在选取之内，以便后面整体替换
      editor.selection.createRangeByElem($linkelem)
      editor.selection.restoreSelection()
      // 显示 panel
      this._createPanel(
        editor.selection.getSelectionText(),
        $linkelem.attr('href')
      )
    } else {
      // 当前选区不在链接里面
      //   console.log(1, editor)
      //   console.log(2, editor.selection.isSelectionEmpty())
      //   console.log(3, editor.selection.getSelectionText())
      if (editor.selection.isSelectionEmpty()) {
        // 选区是空的，未选中内容
        this._createPanel('', '')
      } else {
        // 选中内容了
        this._createPanel(editor.selection.getSelectionText(), '')
      }
    }
  },

  // 创建 panel
  _createPanel: function (text, link) {
    // panel 中需要用到的id
    const inputLinkId = getRandom('input-link')
    const inputTextId = getRandom('input-text')
    const btnOkId = getRandom('btn-ok')
    const btnDelId = getRandom('btn-del')

    // 是否显示“删除链接”
    const delBtnDisplay = this._active ? 'inline-block' : 'none'

    // 初始化并显示 panel
    const panel = new Panel(this, {
      width: 300,
      // panel 中可包含多个 tab
      tabs: [
        {
          // tab 的标题
          title: '链接',
          // 模板
          tpl: `<div>
                    <input id="${inputTextId}" type="text" class="${
            typeof text === 'object' ? 'hidden' : 'block'
          }" value="${text}" placeholder="链接文字"/></td>
                    <input id="${inputLinkId}" type="text" class="block" value="${link}" placeholder="请输入链接"/></td>
                    <div class="w-e-button-container">
                        <button id="${btnOkId}" class="right">插入</button>
                        <button id="${btnDelId}" class="gray right" style="display:${delBtnDisplay}">删除链接</button>
                    </div>
                </div>`,
          // 事件绑定
          events: [
            // 插入链接
            {
              selector: '#' + btnOkId,
              type: 'click',
              fn: () => {
                if (typeof text === 'object') {
                  const $link = $('#' + inputLinkId)
                  const link = $link.val()
                  this._insertLink(-1, link)
                } else {
                  // 执行插入链接
                  const $link = $('#' + inputLinkId)
                  console.log('this', this, $)
                  const $text = $('#' + inputTextId)
                  const link = $link.val()
                  const text = $text.val()
                  this._insertLink(text, link)
                }

                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                return true
              }
            },
            // 删除链接
            {
              selector: '#' + btnDelId,
              type: 'click',
              fn: () => {
                // 执行删除链接
                this._delLink()

                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                return true
              }
            }
          ]
        } // tab end
      ] // tabs end
    })

    // 显示 panel
    panel.show()

    // 记录属性
    this.panel = panel
  },

  // 删除当前链接
  _delLink: function () {
    console.log(this._active)
    // if (!this._active) {
    //   return
    // }
    const editor = this.editor
    const $selectionELem = editor.selection.getSelectionContainerElem()
    console.log(12345, $selectionELem)
    if (!$selectionELem) {
      return
    }
    const selectionText = editor.selection.getSelectionText()
    console.log(123, selectionText)
    const doA = selectionText.querySelector('a')
    const delDOM = document.getElementById(doA.id) // 获取innerHTML 然后插入即可
    console.log(delDOM)
    editor.cmd.do('insertHTML', '<span>' + delDOM.innerHTML + '</span>')
  },

  // 插入链接
  _insertLink: function (text, link) {
    const editor = this.editor
    const config = editor.config
    const linkCheck = config.linkCheck
    let checkResult = true // 默认为 true
    console.log('text', text)
    console.log('link', link)
    /**
     * 逻辑 函数传入的 documentFragment 节点
     * 然后查找 documentFragment 中是否存在 A 标签
     * 存在证明是修改，只需要修改href即可，不需要append新的节点
     * 反之append新的节点
     */
    if (text === -1) {
      const objc = editor.selection.getSelectionText()
      const Dva = objc.querySelector('a') // 判断是否存在超链接
      console.log('dva', Dva)
      if (!Dva) {
        const id = __guid()
        editor.cmd.do(
          'insertHTML',
          `<a href="${link}" target="_blank" id="${id}"></a>`
        )
        const dv = document.getElementById(id)
        console.log(dv, objc)
        dv.appendChild(objc)
      } else {
        console.log('link-2', link)
        const vA = document.getElementById(Dva.id)
        vA.href = link
      }
    } else {
      if (linkCheck && typeof linkCheck === 'function') {
        checkResult = linkCheck(text, link)
      }
      if (checkResult === true) {
        editor.cmd.do(
          'insertHTML',
          `<a href="${link}" id="${__guid()}" target="_blank">${text}</a>` // 保证创建的A标签一定有唯一标识符
        )
      } else {
        alert(checkResult)
      }
    }
  },

  // 试图改变 active 状态
  tryChangeActive: function (e) {
    const editor = this.editor
    const $elem = this.$elem
    const $selectionELem = editor.selection.getSelectionContainerElem()
    if (!$selectionELem) {
      return
    }
    if ($selectionELem.getNodeName() === 'A') {
      this._active = true
      $elem.addClass('w-e-active')
    } else {
      this._active = false
      $elem.removeClass('w-e-active')
    }
  }
}

export default Link
