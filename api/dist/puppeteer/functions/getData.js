"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetData = void 0;
const ppt = require("puppeteer");
async function GetData(url) {
    try {
        const browser = await ppt.launch();
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });
        const value = await page.evaluate(() => {
            let tables;
            let head = '';
            let rightSummary;
            let bottomSummary;
            let generalSummary = '';
            const hypObject = {};
            tables = $('#techinalContent table')
                .map((i_ElementIndex, o_Element) => {
                if (i_ElementIndex === 2) {
                    return;
                }
                let s_TableTitle = '';
                let s_TableDate = '';
                try {
                    s_TableTitle = $('h1,h2,h3,h4,h5,h6')
                        .each(() => { })
                        .find('a')[i_ElementIndex].innerText;
                    s_TableDate = $('h1,h2,h3,h4,h5,h6')
                        .each(() => { })
                        .find('span')[i_ElementIndex].innerText;
                }
                catch (error) {
                    console.log(`DATE/TITLE NOT FOUND FOR TABLE ${i_ElementIndex} IN PAGE`, error);
                    s_TableDate = 'NULL';
                    s_TableTitle = 'NULL';
                }
                const o_AllTableRows = o_Element.getElementsByTagName('td');
                const o_AllTableHeads = o_Element.getElementsByTagName('th');
                const a_FinalRowsArray = [];
                const a_FinalHeadArray = [];
                let a_TempRowsArray = [];
                let i_TableHeaderDivider = 0;
                for (let i = 0; i < o_AllTableHeads.length; i++) {
                    a_FinalHeadArray.push(o_AllTableHeads[i].innerText);
                }
                console.log('IN PAGE.EVAL');
                for (let i = 0; i < o_AllTableRows.length; i++) {
                    if (i_TableHeaderDivider < a_FinalHeadArray.length) {
                        a_TempRowsArray.push(o_AllTableRows[i].innerText
                            .replace(/\n/g, ' ')
                            .replace(/\t/g, '')
                            .trim());
                    }
                    i_TableHeaderDivider++;
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
            const arr = [];
            const x = $('#techStudiesInnerWrap div')
                .map((_i, j) => {
                return j.childNodes;
            })
                .get();
            x.map((i, __j) => {
                arr.push(Array.from(i));
            });
            const z = arr.map((i, __j) => {
                return i.slice(0, 2);
            });
            let t2 = '';
            let c = 0;
            z.map((i, __j) => {
                c = 0;
                i.map((m, __n) => {
                    if (c === 0) {
                        t2 += m.innerText ? m.innerText : m.wholeText;
                    }
                    else if (c === 1) {
                        generalSummary += `${t2} ${m.innerText ? m.innerText : m.wholeText}\n`;
                        t2 = '';
                    }
                    c++;
                });
            });
            const ppointTable = tables.filter((t) => t.tableTitle === 'Pivot Points');
            const pivotsRaw = ppointTable.map((item) => item.tableRows);
            const head1 = ppointTable.map((item) => item.tableHeads);
            const arr2 = [];
            pivotsRaw[0].map((item) => {
                const obj = {};
                head1[0].map((key, i) => {
                    key = key[0].toLowerCase() + key.slice(1);
                    if (key === 'pivot Points') {
                        key = key.split(' ').join('');
                    }
                    obj[key] = item[i];
                });
                arr2.push(obj);
            });
            const technical = tables.filter((t) => t.tableTitle === 'Technical Indicators');
            const technicalRaw = technical.map((item) => item.tableRows);
            const techHead = technical.map((item) => item.tableHeads);
            const arr3 = [];
            technicalRaw[0].map((item) => {
                const obj = {};
                techHead[0].map((key, i) => {
                    key = key[0].toLocaleLowerCase() + key.slice(1);
                    obj[key] = item[i];
                });
                arr3.push(obj);
            });
            hypObject.tables = tables;
            hypObject.head = head;
            hypObject.rightSummary = rightSummary.toString().replace(/,/g, '<br/>');
            hypObject.bottomSummary = bottomSummary.toString().replace(/,/g, ', ');
            hypObject.generalSummary = generalSummary.replace(/\n/g, '<br/>');
            return hypObject;
        });
        return value;
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetData = GetData;
//# sourceMappingURL=getData.js.map