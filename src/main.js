//document.createElement('div')
// const div = dom.create("div")
// console.log(div)

const div = dom.create("<div>newDiv</div>")
console.log(div)

dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes)

//把test的title，改成Hi,I am Frank
dom.attr(test, 'title', 'Hi,I am Ashine')
const title = dom.attr(test, 'title')
console.log(`title:${title}`)

dom.text(test, '你好，我是Ashine')
dom.text(test)

//参数2个，第二个参数=object，第二个参数=字符串
dom.style(test, { border: '1px solid red', color: 'green' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid green')

dom.class.add(test, 'red')
dom.class.remove(test, 'red')
dom.class.add(test, 'blue')//html需要添加blue的class才行
console.log(dom.class.has(test, 'blue'))


const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(s2))