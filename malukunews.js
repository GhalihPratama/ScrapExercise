const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async() => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.malukunews.co/", {waitUntil:'networkidle0'});
    await page.click("body > div.ad-popup.reveal > div > i")
    await page.click("#bar-2 > div > a.search-toggle.show", {delay: 200})
    await page.type("#search-input", "Corona", {delay: 150});
    await page.keyboard.press('Enter')
    await page.waitForSelector("#box-recent-news", {waitUntil:'load', timeout: 50000})
    console.log("Done waiting")

    let data = []

    let html = await page.content()
    let $ = cheerio.load(html)

    $("li.box-entry").toArray().map(news => {
        let UrlB = "https://www.malukunews.co" + $(news).find('.box-entry-title a').attr("href")
        let UrlG = $(news).find('img.box-entry-image').attr("src")
        let ttl = $(news).find('.box-entry-title a').text()
        let hdl = $(news).find('div.box-entry-summary').text()

        data.push({
            UrlBerita : UrlB,
            UrlGambar : UrlG,
            Judul : ttl,
            Headline : hdl
        })
    })

    console.log(data)

    await console.log("Done Inputing to Array")
    await page.goto(data[0].UrlBerita, {waitUntil:'networkidle0'});
    await console.log("Done GoTo a news link")
    await browser.close()
}

main()