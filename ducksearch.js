const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async(query) => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto("https://duckduckgo.com/?q="+ query +"&t=h_&ia=web", {waitUntil:'networkidle0'})
    await page.waitForSelector("div.results", {waitUntil:'load', timeout: 50000})
    console.log("DuckDuckGo Result")

    let data = []

        let html = await page.content()
        let $ = cheerio.load(html)

        $("div.result__body").toArray().map(res => {
            let ttl = $(res).find('a.result__a').text()
            let head = $(res).find('div.result__snippet').text()
            let tgl = $(res).find('.result__date').text()
            let lnk = $(res).find('.result__extras__url > a').attr('href')
            
            
            data.push({
                Se : "duckduckgo.com",
                Title: ttl,
                Headlines: head,
                Published: tgl,
                Link: lnk
            })
        })
        return data
}

exports.run = main