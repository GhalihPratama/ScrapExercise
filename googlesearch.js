const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

module.exports = main = async(query) => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto("https://www.google.com/search?q=" + query , {waitUntil:'networkidle0'})
    await page.waitForSelector("div#search", {waitUntil:'load', timeout: 50000})
    console.log("Google Result")

    let data = []

        let html = await page.content()
        let $ = cheerio.load(html)

        $("div.g").toArray().map(res => {
            let ttl = $(res).find('h3').text()
            let head = $(res).find('span span:last-child').text()
            let tgl = $(res).find('span.f').text()
            let lnk = $(res).find('a').attr("href")
            
            
            data.push({
                Title: ttl,
                Headlines: head,
                Published: tgl,
                Link: lnk
            })
        })

        console.log(data)
}

main("New Covid Variants")