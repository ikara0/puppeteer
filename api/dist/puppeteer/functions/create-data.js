"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateData = void 0;
const lookup_entity_1 = require("../entities/lookup.entity");
const pivot_points_entity_1 = require("../entities/pivot-points.entity");
const tech_indicator_entity_1 = require("../entities/tech-indicator.entity");
const getData_1 = require("./getData");
async function CreateData(id, url, pairRepo, lookupRepo, techRepo, pivotRepo) {
    try {
        const pair = await pairRepo.findOne({ where: { id: id } });
        console.log('Pair Founded');
        const lookUp = new lookup_entity_1.Lookup();
        lookUp.pair = pair;
        lookUp.timeStamp = new Date();
        lookupRepo.create(lookUp);
        await lookupRepo.save(lookUp);
        console.log('Lookup Created');
        const result = await (0, getData_1.GetData)(url);
        for (let i = 0; i < result.tables[0].tableRows.length; i++) {
            const pivot = new pivot_points_entity_1.PivotPoint();
            pivot.name = result.tables[0].tableRows[i][0];
            pivot.s3 = result.tables[0].tableRows[i][1];
            pivot.s2 = result.tables[0].tableRows[i][2];
            pivot.s1 = result.tables[0].tableRows[i][3];
            pivot.pivotPoint = result.tables[0].tableRows[i][4];
            pivot.r1 = result.tables[0].tableRows[i][5];
            pivot.r2 = result.tables[0].tableRows[i][6];
            pivot.r3 = result.tables[0].tableRows[i][7];
            pivot.lookup = lookUp;
            pivotRepo.create(pivot);
            await pivotRepo.save(pivot);
            console.log('Pivots created');
        }
        for (let i = 0; i < result.tables[1].tableRows.length; i++) {
            const techAnalysis = new tech_indicator_entity_1.TechnicalIndicator();
            techAnalysis.name = result.tables[1].tableRows[i][0];
            techAnalysis.value = result.tables[1].tableRows[i][1];
            techAnalysis.action = result.tables[1].tableRows[i][2];
            techAnalysis.lookup = lookUp;
            techRepo.create(techAnalysis);
            await techRepo.save(techAnalysis);
            console.log('analysis created ');
        }
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.CreateData = CreateData;
//# sourceMappingURL=create-data.js.map