"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCryptoNews = void 0;
const ppt = require("puppeteer");
async function GetCryptoNews(url) {
    console.log('Crypto News Loading..');
    try {
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const value = await page.evaluate(async () => {
            let data = {};
            data.indiceName = $('#fullColumn h1').first().text().replace('\t', '');
            data.lang = document.documentElement.lang;
            data.news = [];
            const result = $('.js-news-items .articleItem').map((i, el) => {
                let obj = {};
                if (el.children[1].children[0].href.includes('investing.com')) {
                    obj.title = el.children[1].children[0].innerText;
                    obj.spot = el.children[1].children[2].innerText.replace('Investing.com', ' ');
                    obj.totalNewsLink = el.children[1].children[0].href;
                    obj.sumImgSrc = el.children[0].childNodes[0].dataset.src;
                    obj.order = i;
                    data.news.push(obj);
                }
            });
            return data;
        });
        console.log('Summary Handled');
        const { news } = value;
        if (news.length > 0) {
            for (let i = 0; i < news.length; i++) {
                await page.goto(news[i].totalNewsLink, { waitUntil: 'networkidle2' });
                const total = await page.evaluate(async () => {
                    let totalParag = [];
                    const result = $('.WYSIWYG.articlePage p, .WYSIWYG.articlePage li, .WYSIWYG. blockquote')
                        .map((i, el) => {
                        if (el.innerText === 'Position added successfully to: \n') {
                            return;
                        }
                        if (el.innerText === 'Pozisyon başarıyla eklendi: \n') {
                            return;
                        }
                        if (!el.innerText.includes('investing.com')) {
                            totalParag.push(el.innerText.replace('Investing.com', ' '));
                        }
                    })
                        .get();
                    return totalParag;
                });
                news[i].content = total;
            }
        }
        console.log('Total Handled');
        return value;
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetCryptoNews = GetCryptoNews;
//# sourceMappingURL=getCryptoNews.js.map