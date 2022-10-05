"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedIndice = void 0;
const indice_entity_1 = require("../entities/indice.entity");
async function SeedIndice(indiceRepo) {
    const result = await indiceRepo
        .createQueryBuilder()
        .insert()
        .into(indice_entity_1.Indice)
        .values([
        {
            name: 'USD/TRY - US Dollar Turkish Lira',
            alias: 'usdTry',
            source: [
                'https://www.investing.com/currencies/usd-try-news',
                'https://tr.investing.com/currencies/usd-try-news',
            ],
            fetchedAt: '2022-10-05 10:42:51.797+03',
        },
        {
            name: 'EUR/TRY - Euro Turkish Lira',
            alias: 'eurTry',
            source: [
                'https://www.investing.com/currencies/eur-try-news',
                'https://tr.investing.com/currencies/eur-try-news',
            ],
            fetchedAt: '2022-10-05 11:43:51.797+03',
        },
        {
            name: 'GBP/TRY - British Pound Turkish Lira',
            alias: 'gbpTry',
            source: [
                'https://www.investing.com/currencies/gbp-try',
                'https://tr.investing.com/currencies/gbp-try',
            ],
            fetchedAt: '2022-10-05 11:33:51.797+03',
        },
        {
            name: 'USD/JPY - US Dollar Japanese Yen',
            alias: 'usdJpy',
            source: [
                'https://www.investing.com/currencies/usd-jpy-news',
                'https://tr.investing.com/currencies/usd-jpy-news',
            ],
            fetchedAt: '2022-10-05 11:42:51.797+03',
        },
        {
            name: 'GBP/USD - British Pound US Dollar',
            alias: 'gbpUsd',
            source: [
                'https://www.investing.com/currencies/gbp-usd-news',
                'https://tr.investing.com/currencies/gbp-usd-news',
            ],
            fetchedAt: '2022-10-05 11:43:51.797+03',
        },
        {
            name: 'EUR/USD - Euro US Dollar',
            alias: 'eurUsd',
            source: [
                'https://www.investing.com/currencies/eur-usd-news',
                'https://tr.investing.com/currencies/eur-usd-news',
            ],
            fetchedAt: '2022-10-05 11:45:51.797+03',
        },
        {
            name: 'Ethereum',
            alias: 'eth',
            source: [
                'https://www.investing.com/crypto/ethereum/news',
                'https://tr.investing.com/crypto/ethereum/news',
            ],
            fetchedAt: '2022-10-05 11:47:57.469+03',
        },
        {
            name: 'Litecoin',
            alias: 'ltc',
            source: [
                'https://www.investing.com/crypto/litecoin/news',
                'https://tr.investing.com/crypto/litecoin/news',
            ],
            fetchedAt: '2022-10-05 11:48:02.743+03',
        },
        {
            name: 'Apple Inc (AAPL)',
            alias: 'apple',
            source: [
                'https://www.investing.com/equities/apple-computer-inc-news',
                'https://tr.investing.com/equities/apple-computer-inc-news',
            ],
            fetchedAt: '2022-10-05 11:48:04.454+03',
        },
        {
            name: 'Dow Jones Industrial Average (DJI)',
            alias: 'dow',
            source: [
                'https://www.investing.com/indices/us-30-news',
                'https://tr.investing.com/indices/us-30-news',
            ],
            fetchedAt: '2022-10-05 11:48:21.747+03',
        },
        {
            name: 'IOTA',
            alias: 'iota',
            source: [
                'https://www.investing.com/crypto/iota/news',
                'https://tr.investing.com/crypto/iota/news',
            ],
            fetchedAt: '2022-10-05 11:49:18.065+03',
        },
        {
            name: 'XRP',
            alias: 'xrp',
            source: [
                'https://www.investing.com/crypto/xrp/news',
                'https://tr.investing.com/crypto/xrp/news',
            ],
            fetchedAt: '2022-10-05 11:49:21.655+03',
        },
        {
            name: 'Ethereum Classic',
            alias: 'ethClassic',
            source: [
                'https://www.investing.com/crypto/ethereum-classic/news',
                'https://tr.investing.com/crypto/ethereum-classic/news',
            ],
            fetchedAt: '2022-10-05 11:49:24.098+03',
        },
        {
            name: 'XAG/USD - Silver Spot US Dollar',
            alias: 'xagUsd',
            source: [
                'https://www.investing.com/currencies/xag-usd-news',
                'https://tr.investing.com/currencies/xag-usd-news',
            ],
            fetchedAt: '2022-10-05 11:49:26.298+03',
        },
        {
            name: 'Bitcoin',
            alias: 'btc',
            source: [
                'https://www.investing.com/crypto/bitcoin/news',
                'https://tr.investing.com/crypto/bitcoin/news',
            ],
            fetchedAt: '2022-10-05 11:49:51.797+03',
        },
        {
            name: 'XAU/USD - Gold Spot US Dollar',
            alias: 'xauUsd',
            source: [
                'https://tr.investing.com/currencies/xau-usd-news',
                'https://www.investing.com/currencies/xau-usd-news',
            ],
            fetchedAt: '2022-10-05 11:52:56.208+03',
        },
        {
            name: 'NZD/USD - New Zealand Dollar US Dollar',
            alias: 'nzdUsd',
            source: [
                'https://www.investing.com/currencies/nzd-usd-news',
                'https://tr.investing.com/currencies/nzd-usd-news',
            ],
            fetchedAt: '2022-10-05 12:12:00.091+03',
        },
        {
            name: 'USD/CAD - US Dollar Canadian Dollar',
            alias: 'usdCad',
            source: [
                'https://www.investing.com/currencies/usd-cad-news',
                'https://tr.investing.com/currencies/usd-cad-news',
            ],
            fetchedAt: '2022-10-05 12:14:00.072+03',
        },
        {
            name: 'EUR/GBP - Euro British Pound',
            alias: 'eurGbp',
            source: [
                'https://www.investing.com/currencies/eur-gbp-news',
                'https://tr.investing.com/currencies/eur-gbp-news',
            ],
            fetchedAt: '2022-10-05 12:16:00.072+03',
        },
        {
            name: 'AUD/USD - Australian Dollar US Dollar',
            alias: 'audUsd',
            source: [
                'https://www.investing.com/currencies/aud-usd-news',
                'https://tr.investing.com/currencies/aud-usd-news',
            ],
            fetchedAt: '2022-10-05 12:18:00.082+03',
        },
        {
            name: 'USD/CHF - US Dollar Swiss Franc',
            alias: 'usdChf',
            source: [
                'https://www.investing.com/currencies/usd-chf-news',
                'https://tr.investing.com/currencies/usd-chf-news',
            ],
            fetchedAt: '2022-10-05 12:20:00.077+03',
        },
    ])
        .execute();
    return result;
}
exports.SeedIndice = SeedIndice;
//# sourceMappingURL=seedIndice.js.map