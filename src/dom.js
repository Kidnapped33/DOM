window.dom = {
    // create: function () { }//等价
    // 注释：创造一个tagName，返回的值是
    // 创建一个标签节点
    // create(tagName) {
    //     return document.createElement(tagName)
    // }

    // template可以容纳任意元素
    //增删改查----增
    create(string) {//创建节点
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) {//新增弟弟
        // 如果node是最后一个节点也可以实行
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {//新增哥哥
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {//新增孩子
        parent.appendChild(node)
    },
    wrap(node, parent) {//新增爸爸
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //增删改查----删
    remove(node) {
        node.parentNode.removeChild(node)
        //让删除的人保留node节点的引用
        return node
    },
    //删掉所有的孩子,删除后array还可以引用,因为childNodes每次删除，
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    //增删改查----改
    //读写属性，改title
    attr(node, name, value) {//重载
        //如果参数长度等于3个，则是改名字
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        }  //如果参数长度等于2个，则是获取名字，获取要return
        else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //改文本内容
    text(node, string) {//适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string //ie
            } else {
                node.textContent = string // firefox/ Chrome
            }
        }
        else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText  //ie
            } else {
                return node.textContent // firefox/ Chrome
            }
        }
    },
    //改html内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },

    // style(node, object) {
    //     for (let key in object) {
    //         //key:border/color
    //         //node.style.border = ...
    //         //node.style.color=...
    //         node.style[key] = object[key]
    //     }
    // }
    //改style内容
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value
        }
        else if (arguments.length === 2) {
            //dom.style(div,'color')
            if (typeof name === 'string') {
                return node.style[name]
            }
            else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }

    },
    //改class内容
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        },
    },

    //添加监听事件
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    //删除监听事件
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },



    //查
    // find(selector) {
    //     return document.querySelectorAll(selector)
    // }
    find(selector, scope) {
        //如果有多个，那就在scope范围里面找，没有就直接document
        // let x = scope || document
        // return x.querySelectorAll(selector) 和下面等价
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        //3是文本，相关资料查node.nodeType
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },

    previous(node) {
        let x = node.previousSibling
        //3是文本，相关资料查node.nodeType
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },

    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },

    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }

}
// dom.create = function () { } //等价
// window.dom.create = function () { } //等价
