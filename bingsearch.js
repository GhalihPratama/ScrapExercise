const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async (query) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto("https://www.bing.com/search?q=" + query, { waitUntil: 'networkidle0' })
    await page.waitForSelector("#b_content", { waitUntil: 'load', timeout: 50000 })
    console.log("Bing Result")

    let data = []

    let html = await page.content()
    let $ = cheerio.load(html)

    $("li.b_algo").toArray().map(res => {
        let ttl = $(res).find('h2 > a').text()
        let head = $(res).find('.b_caption > p').text()
        let tgl = $(res).find('.news_dt').text()
        let lnk = $(res).find('.b_attribution > cite').text()


        data.push({
            Se : "bing.com",
            Title: ttl,
            Headlines: head,
            Published: tgl,
            Link: lnk
        })
    })
    return data
}

exports.run = main