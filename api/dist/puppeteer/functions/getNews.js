"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNews = void 0;
const ppt = require("puppeteer");
async function GetNews(url) {
    try {
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });
        const value = await page.evaluate(async () => {
            let head;
            let newsTitles = [];
            let newsContent = [];
            let newsSumImgSrc = [];
            let lang;
            let totalNewsLink = [];
            head = $('.instrumentHead h1').first().text();
            lang = document.documentElement.lang;
            const detail = $('.mediumTitle1 .articleItem')
                .map(async (i, el) => {
                if (i > 2 && el.children[1].children[2].innerText !== '') {
                    newsSumImgSrc.push(`${i}-${el.children[0].children[0].src}`);
                    newsContent.push(el.children[1].children[2].innerText);
                    newsTitles.push(el.children[1].children[0].innerText);
                    totalNewsLink.push(el.children[1].children[0].href);
                }
            })
                .get();
            const news = [];
            for (let i = 0; i < newsTitles.length; i++) {
                let obj = {
                    title: '',
                    summary: '',
                    sumImgSrc: '',
                    totalNewsLink: '',
                };
                obj.title = newsTitles[i] ? newsTitles[i] : 'NULL';
                obj.summary = newsContent[i];
                obj.sumImgSrc = newsSumImgSrc[i];
                obj.totalNewsLink = totalNewsLink[i];
                news.push(obj);
            }
            const finalObject = {
                head: head,
                lang: lang,
                news: news,
            };
            return finalObject;
        });
        const { news } = value;
        const summNews = [];
        for (let i = 0; i < news.length; i++) {
            await page.goto(news[i].totalNewsLink, { waitUntil: 'networkidle0' });
            const total = await page.evaluate(async () => {
                let totalParag = [];
                const detail = $('.WYSIWYG.articlePage p, .WYSIWYG.articlePage li')
                    .map((i, el) => {
                    if (el.innerText === 'Position added successfully to: \n') {
                        return;
                    }
                    if (el.innerText === 'Pozisyon başarıyla eklendi: \n') {
                        return;
                    }
                    totalParag.push(el.innerText);
                })
                    .get();
                return totalParag;
            });
            summNews.push(total);
        }
        const lastObject = {
            General: value,
            TotalNews: summNews,
        };
        return lastObject;
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetNews = GetNews;
//# sourceMappingURL=getNews.js.map