let css1, css2, css3, markdown
init()
writeCss('', css1, ()=>{
    createPaper( ()=>{
        writeMarkdown(markdown, ()=>{
            writeCss(css1,css2,()=> {
                markdownToHtml(() => {
                    writeCss(css1 + css2, css3)
                })
            })
        })
    })
})


/*******     以下为函数      *********/
function init() {
    css1 = `/* 
 * 面试官您好，我是刘潇潇
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}

/* 文字离边框太近了 */
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.punctuation{
    color: #905;
}
.token.property{
    color: #DD4A68;
}

/* 来一点3D效果吧 */
#code{
    animation: breath 0.75s infinite alternate-reverse;
}

/* 接下来，让我来介绍一下自己 */

/* 首先，我需要一张白纸 */

#code{
    position: fixed;
    top: 16px;
    left: 16px;
    width: 43%;
    height: 95%;
}

#paper> .content{
    display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */`

    markdown = `
# 自我介绍

我叫 刘潇潇  1998 年 10 月出生 长沙理工大学学生
自学前端半年  希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. 苹果风格的轮播
2. 网页版简历
3. canvas 画板

# 联系方式

- QQ 1512345678
- Email xxxxxxxx
- 手机 xxxxxxx
`
    css2 = `

/* 
 * 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */

`
    css3 = `


/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
}

function writeCss(prefix,newCss,fn) {
    let n = 0
    let domCode = document.querySelector('#code')
    let timer = setInterval(function () {
        n++
        domCode.innerHTML = Prism.highlight(prefix + newCss.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + newCss.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= newCss.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 10)
}

function createPaper(fn) {
    let paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
    let content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    fn && fn.call()

}

function writeMarkdown(markdown, fn) {
    let n = 0
    let domContent = document.querySelector('#paper> .content')
    let timer = setInterval(function () {
        n++
        domContent.innerHTML = markdown.substring(0, n)
        domContent.scrollTop = domContent.scrollHeight
        if (n >= markdown.length) {
            console.log(1)
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 10)
}

function markdownToHtml(fn){
    document.querySelector('#paper> .content').innerHTML = marked(markdown)
    fn && fn.call()
}
