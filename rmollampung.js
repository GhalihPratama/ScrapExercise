const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async() => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.goto("https://www.rmollampung.id/cari?q=Jokowi")
    await page.waitForSelector(".gmr-archive", {waitUntil:'load', timeout: 50000})

    let data = []

    let html = await page.content()
    let $ = cheerio.load(html)

    $(".gmr-archive").toArray().map(dat => {
        let Url = $(dat).find('.entry-title a').attr("href")
        let title = $(dat).find('.entry-title a').text().replace('\n','')

        data.push({
            URL: Url,
            Title: title
        })
    })

    console.log(data)

    await console.log("Done Inputing to Array")

    let advdata = []

    for (let i = 0; i < data.length; i++) {
        await page.goto(data[i].URL, {waitUntil:'networkidle0'})

        html = await page.content()
        $ = cheerio.load(html)

        let advtitle = $('.entry-title').text()
        let advpublish = $('.entry-date').text()
        let content = $('.entry-content p').text().trim()

        advdata.push({
            Title: advtitle,
            Publish: advpublish,
            Article: content
        })

        console.log(advdata)
    }

    await console.log("DONE!")
    await browser.close()
}

main()