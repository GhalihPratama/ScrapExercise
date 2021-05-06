const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const delay = require('delay')
const moment = require('moment')

let main = async () => {
    const browser = await puppeteer.launch({ headless: false, args: ["--disable-notifications"], defaultViewport: null })
    const page = await browser.newPage();
    await page.goto("https://globalmedianews.co.id/", { waitUntil: 'networkidle0' })
    await page.evaluate(() => {
        document.querySelector('.jeg_search_toggle').click()
    })
    await page.waitForSelector(".jeg_search_input", {waitUntil:'networkidle0'})
    await page.type(".jeg_search_input", "Corona", {delay: 200})
    await page.keyboard.press('Enter')
    await page.waitForSelector("div.jeg_posts", {waitUntil:'load', timeout : 30000})
    console.log("Done Loads page")

    let data = []

    let html = await page.content()
    let $ = cheerio.load(html)

    $("article").toArray().map(dataa => {
        let UrlB = $(dataa).find('.jeg_post_title > a').attr('href');
        let ttl = $(dataa).find('.jeg_post_title > a').text();
        let UrlG = $(dataa).find('img.attachment-jnews-350x250').attr('src');
        let tgl = $(dataa).find('.jeg_meta_date a').text();
        let date = moment(tgl, "MMMM DD, YYYY").format("YYYY-MM-D")

        data.push ({
            UrlBerita : UrlB,
            Judul : ttl,
            UrlGambar : UrlG,
            Publish : date
        })
        
    })

    console.log(data)

    await console.log("Done Inputing to Array and changing date formats")

    let isidata = data
    isidata.forEach(isidata => {
        console.log("Daftar Link Berita :")
        console.log(isidata.UrlBerita)
    });

    await browser.close()
    
//     const pages = await browser.newPage()
//     await pages.goto(data[0].UrlBerita,{waitUntil:'networkidle0'})

//     $('entry-content no-share').toArray().map(isi => {
//         let cont = $(isi).find('content-inner').text()

//         data.push ({
//             Content : cont
//         })
//     })

//     console.log(data)
//     console.log("Input content complete")

}

main()