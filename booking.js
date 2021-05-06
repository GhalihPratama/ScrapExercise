const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')

let main = async() => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://booking.com", {waitUntil:'networkidle0'});
    await page.type("#ss", "Bandung", {delay: 200});
    await page.click("#frm > div.xp__fieldset.js--sb-fieldset.accommodation > div.xp__button > div.sb-searchbox-submit-col.-submit-button > button")
    await page.waitForSelector("#search_results_table", {waitUntil:'load', timeout: 50000})
    console.log("Done waiting")

    let data = []
    // do{
        let html = await page.content()
        let $ = cheerio.load(html)

        $("div.sr_item").toArray().map(name => {
            let htl = $(name).find('.sr-hotel__name').text().replace('\n','')
            let rvw = $(name).find('.bui-review-score__text').text()
            let urlG = $(name).find('.hotel_image').attr('src')
            let rat = $(name).find('.bui-review-score__badge').text()
            data.push({
                NamaHotel : htl,
                JumlahReview : rvw,
                UrlGambar : urlG,
                Rating : rat
            })
        })

        console.log(data)
    // }while (posts.length <= 10)

    await console.log("Done")
    await browser.close()
}

main()