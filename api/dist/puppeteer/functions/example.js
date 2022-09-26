"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const baseUrls_contants_1 = require("../constants/baseUrls.contants");
const getData_1 = require("./getData");
async function Example(repo) {
    const result = await (0, getData_1.GetData)(baseUrls_contants_1.BaseUrls.BtcUsdTechnical);
    const ppointTable = result.tables.filter((t) => t.tableTitle === 'Pivot Points');
    const pivotsRaw = ppointTable.map((item) => item.tableRows);
    const head = ppointTable.map((item) => item.tableHeads);
    const arr = [];
    pivotsRaw[0].map((item) => {
        const obj = {};
        head[0].map((key, i) => {
            key = key[0].toLowerCase() + key.slice(1);
            if (key === 'pivot Points') {
                key = key.split(' ').join('');
            }
            obj[key] = item[i];
        });
        arr.push(obj);
    });
    return result;
}
exports.Example = Example;
//# sourceMappingURL=example.js.map