"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNews = void 0;
const ppt = require("puppeteer");
async function GetNews(url) {
    console.log('Veriler Yükleniyor', url);
    try {
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const value = await page.evaluate(async () => {
            let data = {};
            data.indiceName = $('.instrumentHead h1')
                .first()
                .text()
                .replace('\t', '');
            data.lang = document.documentElement.lang;
            data.news = [];
            const result = $('.mediumTitle1 .articleItem')
                .map((i, el) => {
                if (el.children[1].children[0].href.includes('investing.com')) {
                    if (i > 2 && el.children[1].children[2].innerText !== '') {
                        let obj = {};
                        obj.title = el.children[1].children[0].innerText;
                        obj.spot = el.children[1].children[2].innerText.replace('Investing.com', ' ');
                        obj.sumImgSrc = el.children[0].childNodes[0].dataset.src;
                        obj.totalNewsLink = el.children[1].children[0].href;
                        obj.order = i;
                        data.news.push(obj);
                    }
                }
            })
                .get();
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
                const date = await page.evaluate(async () => {
                    let pureTime = [];
                    const time = $('.contentSectionDetails')
                        .map((i, el) => {
                        let value = el.children[2].innerText;
                        let exist = value.indexOf('(');
                        if (exist !== -1) {
                            pureTime.push(value.slice(exist + 1, -1));
                        }
                        else {
                            pureTime.push(value);
                        }
                    })
                        .get();
                    return pureTime;
                });
                news[i].dateTime = date[0];
            }
        }
        console.log('Total Handled');
        return value;
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetNews = GetNews;
//# sourceMappingURL=getNews.js.map