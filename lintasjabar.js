const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async() => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.goto("https://lintasjabar.com/")
    await page.waitForSelector("#header-searchform", {waitUntil:'load', timeout: 50000})
    await page.type("#header-searchform", "Jokowi", {delay: 150})
    await page.keyboard.press('Enter')
    await page.waitForSelector(".is-multiline", {waitUntil:'load', timeout: 50000})

    let data = []

    let html = await page.content()
    let $ = cheerio.load(html)

    $(".is-multiline").toArray().map(dat => {
        let Url = $(dat).find('.title a').attr("href")
        let title = $(dat).find('.title a').attr("title")

        data.push({
            URL: Url,
            Title: title
        })
    })

    console.log(data)

    await console.log("Done Inputing to Array")
    await page.goto(data[0].URL, {waitUntil:'networkidle0'})

    let advdata = []

    html = await page.content()
    $ = cheerio.load(html)

        let advtitle = $('.entry-title h1').text().trim()
        let advpublish = $('.entry-meta span.post-time').text()
        let content = $('.is-medium-desktop p').text().trim()

        advdata.push({
            Title: advtitle,
            Publish: advpublish,
            Article: content
        })

    console.log(advdata)

    await console.log("DONE!")
    await browser.close()
}

main()