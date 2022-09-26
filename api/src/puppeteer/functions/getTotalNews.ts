import * as ppt from 'puppeteer';
export async function TotalNews(url: string) {
  try {
    const browser = await ppt.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const total = await page.evaluate(async () => {
      let totalParag: string[] = [];

      const total = $('.WYSIWYG.articlePage p, .WYSIWYG.articlePage li')
        .map((i, el) => {
          if (el.innerText === 'Position added successfully to: \n') {
            return;
          }
          totalParag.push(el.innerText);
        })
        .get();
      return totalParag;
    });
    return total;
  } catch (error) {
    console.log(error);
  }
}

// for (const item of totalNewsLink) {
//     try {
//       await page.goto(item, { waitUntil: 'networkidle0' });
//       const total = await page.evaluate(async () => {
//         $('.WYSIWYG.articlePage p, .WYSIWYG.articlePage li')
//           .map((i, el) => {
//             console.log('düştüm');
//             if (el.innerText === 'Position added successfully to: \n') {
//               return;
//             }
//             prg.push(el.innerText);
//           })
//           .get();
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }