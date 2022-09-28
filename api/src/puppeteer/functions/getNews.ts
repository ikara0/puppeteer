import * as ppt from 'puppeteer';

export async function GetNews(url: string) {
  console.log('Veriler Yükleniyor');
  try {
    const browser = await ppt.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    const value = await page.evaluate(async () => {
      let head: string;
      let newsTitles: string[] = [];
      let newsContent: string[] = [];
      let newsSumImgSrc: any = [];
      let lang: string;
      let totalNewsLink: string[] = [];

      head = $('.instrumentHead h1').first().text();

      lang = document.documentElement.lang;

      const detail = $('.mediumTitle1 .articleItem')
        .map(async (i: number, el: any) => {
          if (el.children[1].children[0].href.includes('investing.com')) {
            if (i > 2 && el.children[1].children[2].innerText !== '') {
              newsSumImgSrc.push(`${i}-${el.children[0].children[0].src}`); // e.children[0].children[0].src
              newsContent.push(
                el.children[1].children[2].innerText.replace(
                  'Investing.com',
                  ' ',
                ),
              ); // e.children[1].children[2].innerText

              newsTitles.push(el.children[1].children[0].innerText); // e.children[1].children[0].innerText
              totalNewsLink.push(el.children[1].children[0].href);
            }
          }
        })
        .get();

      const news: any = [];

      for (let i = 0; i < newsTitles.length; i++) {
        let obj: any = {
          title: '',
          spot: '',
          sumImgSrc: '',
          totalNewsLink: '',
          order: '',
        };
        obj.title = newsTitles[i] ? newsTitles[i] : 'NULL';
        obj.spot = newsContent[i];
        obj.sumImgSrc = newsSumImgSrc[i];
        obj.totalNewsLink = totalNewsLink[i];
        obj.order = i;
        news.push(obj);
      }

      const finalObject = {
        head: head.replace('\t', ''),
        lang: lang,
        news: news,
      };
      return finalObject;
    });
    console.log('Raw summary yüklendi');
    const { news } = value;
    const summNews: any = [];
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
            totalParag.push(el.innerText.replace('Investing.com', ' '));
          })
          .get();
        return totalParag;
      });
      summNews.push(total);
    }
    console.log('Total News Created');

    const result: any = [];

    for (let i = 0; i < news.length; i++) {
      let obj: any = {};
      obj.news = news[i];
      obj.news.context = summNews[i];
      result.push(obj);
    }

    const lastObject = {
      IndiceName: value.head,
      Lang: value.lang,
      TotalNews: result,
    };
    console.log('Completed');
    return lastObject;
  } catch (error) {
    console.log(error);
  }
}
