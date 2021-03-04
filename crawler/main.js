const axios = require("axios")
const cheerio = require("cheerio");
const template = require("art-template")
const path = require("path")

//引入HTTP模块
const http = require('http');
//创建网站服务器
const app = http.createServer();
// // //当客户端访问服务器端的时候
// app.on('request', (req, res) => {
//     const novelData = await getNovelData();
//     const html = template(path.join(__dirname, './template.art'), { novelData })
//     res.end(html)
// })
// app.listen(80);
console.log('服务器启动成功')

function getNovelData() {
    return axios({
        methods: "get",
        url: "https://www.book900.com/19_19073/289",
    }).then(res => {
        const $ = cheerio.load(res.data)
        const title = $('.bookname h1').text();
        const content = $('#content').html();
        console.log(res.data)
        const novel = {
            title,
            content,
        }
        return novel

    }).catch((error) => {
        console.log(error)
    })
}

async function renderTemplate() {
    const novelData = await getNovelData();
    app.on('request', (req, res) => {
        const html = template(path.join(__dirname, './template.art'), { novelData })
        res.end(html)
    })
    app.listen(80);

}
renderTemplate()