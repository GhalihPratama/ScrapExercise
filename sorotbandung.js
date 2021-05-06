const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async() => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://sorot-bandung.com/", {waitUntil:'networkidle0'})
    await page.waitForSelector("body", {waitUntil:'load', timeout: 50000})
    console.log("Done waiting")

    let data = []
        let html = await page.content()
        let $ = cheerio.load(html)

        $("div.gmr-box-content").toArray().map(datas => {
            let ttl = $(datas).find('h2.entry-title > a').text()
            let hdl = $(datas).find('[itemprop=text] p').text()
            let UrlG = $(datas).find('img.attachment-medium').attr('src')
            let tgl = $(datas).find('time.updated').text()
            // $(datas).find('time.updated').attr('datetime')
            let UrlB = $(datas).find('h2.entry-title > a').attr('href')

            data.push({
                Title : ttl,
                Headline : hdl,
                UrlGambar : UrlG,
                Dipublikasikan : tgl,
                UrlBerita : UrlB
            })
        })

    console.log(data)
    await console.log("Done")
    await browser.close()
}

main()