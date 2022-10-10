import * as ppt from 'puppeteer';
// import $ from 'jquery';

//
export async function GetData(url: string) {
  try {
    const browser = await ppt.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    // const data = await page.$x(tableInfo);
    const value = await page.evaluate(() => {
      let tables: any;
      let head: string = '';
      let rightSummary: string[];
      let bottomSummary: string[];
      let generalSummary: string = '';

      const hypObject: any = {};
      tables = $('#techinalContent table')
        .map((i_ElementIndex: number, o_Element: Element) => {
          //Skip the last table (Moving Averages)
          if (i_ElementIndex === 2) {
            return;
          }
          let s_TableTitle: string = '';
          let s_TableDate: string = '';
          //Getting table titles and dates
          try {
            s_TableTitle = $('h1,h2,h3,h4,h5,h6')
              .each(() => {})
              .find('a')[i_ElementIndex].innerText;

            s_TableDate = $('h1,h2,h3,h4,h5,h6')
              .each(() => {})
              .find('span')[i_ElementIndex].innerText;
          } catch (error) {
            console.log(
              `DATE/TITLE NOT FOUND FOR TABLE ${i_ElementIndex} IN PAGE`,
              error,
            );

            s_TableDate = 'NULL';
            s_TableTitle = 'NULL';
          }
          //Getting all the TDs and Ths of the current table (This will be the rows and headers of the current table)
          const o_AllTableRows: HTMLCollectionOf<HTMLTableHeaderCellElement> =
            o_Element.getElementsByTagName('td');
          const o_AllTableHeads: HTMLCollectionOf<HTMLTableHeaderCellElement> =
            o_Element.getElementsByTagName('th');
          //Array to store all headers and rows of the table
          const a_FinalRowsArray: string[][] = [];
          const a_FinalHeadArray: string[] = [];
          let a_TempRowsArray: string[] = [];
          let i_TableHeaderDivider: number = 0;
          for (let i: number = 0; i < o_AllTableHeads.length; i++) {
            a_FinalHeadArray.push(o_AllTableHeads[i].innerText);
          }

          console.log('IN PAGE.EVAL');

          //Loop through all rows (just a 1-D array) and uses the @i_TableHeaderDivider variable to locate rows appropriately
          for (let i: number = 0; i < o_AllTableRows.length; i++) {
            //Keep pushing rows to @a_TempRowsArray until the next table row
            if (i_TableHeaderDivider < a_FinalHeadArray.length) {
              a_TempRowsArray.push(
                o_AllTableRows[i].innerText
                  .replace(/\n/g, ' ')
                  .replace(/\t/g, '')
                  .trim(),
              );
            }
            //Increment @i_TableHeaderDivider
            i_TableHeaderDivider++;

            //Reset @i_TableHeaderDivider so we can move to next row in the table. Push the current rows into @a_FinalRowsArray and clear @a_TempRowsArray array
            if (i_TableHeaderDivider === a_FinalHeadArray.length) {
              i_TableHeaderDivider = 0;
              console.log('Array', a_TempRowsArray);
              a_FinalRowsArray.push(a_TempRowsArray);
              a_TempRowsArray = [];
            }
          }

          const o_FinalTableObject = {
            tableHeads: a_FinalHeadArray,
            tableRows: a_FinalRowsArray,
            tableTitle: s_TableTitle,
            tableDate: s_TableDate,
          };

          return o_FinalTableObject;
        })
        .get();

      //Getting the main title of page
      head = $('.instrumentHead h1').first().text();

      rightSummary = $('#quotes_summary_current_data .right div')
        .map((__index, element) => {
          return element.innerText;
        })
        .get();

      bottomSummary = $('#quotes_summary_secondary_data ul li')
        .map((__index, element) => {
          return element.innerText;
        })
        .get();
      const arr: any = [];
      const x = $('#techStudiesInnerWrap div')
        .map((_i, j) => {
          return j.childNodes;
        })
        .get();

      x.map((i, __j) => {
        arr.push(Array.from(i));
      });

      const z = arr.map((i: any, __j: any) => {
        return i.slice(0, 2);
      });

      let t2 = '';

      let c = 0;

      z.map((i: any, __j: any) => {
        c = 0;
        i.map((m: any, __n: any) => {
          if (c === 0) {
            t2 += m.innerText ? m.innerText : m.wholeText;
          } else if (c === 1) {
            generalSummary += `${t2} ${
              m.innerText ? m.innerText : m.wholeText
            }\n`;
            t2 = '';
          }

          c++;
        });
      });

      const ppointTable = tables.filter((t) => t.tableTitle === 'Pivot Points');
      const pivotsRaw = ppointTable.map((item) => item.tableRows);
      const head1 = ppointTable.map((item) => item.tableHeads);
      const arr2: any = [];
      pivotsRaw[0].map((item) => {
        const obj: any = {};
        head1[0].map((key, i) => {
          key = key[0].toLowerCase() + key.slice(1);
          if (key === 'pivot Points') {
            key = key.split(' ').join('');
          }
          obj[key] = item[i];
        });
        arr2.push(obj);
      });

      const technical = tables.filter(
        (t) => t.tableTitle === 'Technical Indicators',
      );
      const technicalRaw = technical.map((item) => item.tableRows);
      const techHead = technical.map((item) => item.tableHeads);

      const arr3: any = [];
      technicalRaw[0].map((item) => {
        const obj: any = {};
        techHead[0].map((key, i) => {
          key = key[0].toLocaleLowerCase() + key.slice(1);
          obj[key] = item[i];
        });
        arr3.push(obj);
      });

      // tables[0].tableRows = arr2;
      // tables[1].tableRows = arr3;
      hypObject.tables = tables;
      hypObject.head = head;
      hypObject.rightSummary = rightSummary.toString().replace(/,/g, '<br/>');

      hypObject.bottomSummary = bottomSummary.toString().replace(/,/g, ', ');

      hypObject.generalSummary = generalSummary.replace(/\n/g, '<br/>');

      return hypObject;
    });
    // await browser.close();
    return value;
  } catch (error) {
    console.log(error);
  }
}
