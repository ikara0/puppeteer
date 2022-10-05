import axios from "axios";
import React, { useState } from "react";
import News from "./News";

function App() {
  const [alias, setAlias] = useState("apple");
  const [lang, setLanguage] = useState("en");
  function handle(id) {
    setAlias(id);
  }
  const refresh = async () => {
    const isRefreshed = await axios
      .post(`http://localhost:3000/puppeteer/news/${alias}?lang=${lang}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    return isRefreshed;
  };
  return (
    <div className="ui container">
      <div>
        <select
          style={{ marginLeft: "90%" }}
          className="ui dropdown"
          value={lang}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>
      <div style={{ marginTop: "5px", display: "flex" }}>
        <button onClick={() => handle("apple")} className="ui primary button">
          APPLE
        </button>
        <button onClick={() => handle("dow")} className="ui primary button">
          DOW JONES
        </button>
        <button onClick={() => handle("eurUsd")} className="ui primary button">
          EUR/USD
        </button>
        <button onClick={() => handle("gbpUsd")} className="ui primary button">
          GBP/USD
        </button>
        <button onClick={() => handle("usdJpy")} className="ui primary button">
          USD/JPY
        </button>
        <button onClick={() => handle("usdChf")} className="ui primary button">
          USD/CHF
        </button>
        <button onClick={() => handle("audUsd")} className="ui primary button">
          AUD/USD
        </button>
        <button onClick={() => handle("eurGbp")} className="ui primary button">
          EUR/GBP
        </button>
        <button onClick={() => handle("usdCad")} className="ui primary button">
          USD/CAD
        </button>
        <button onClick={() => handle("nzdUsd")} className="ui primary button">
          NZD/USD
        </button>
        <button onClick={() => handle("xauUsd")} className="ui primary button">
          XAU/USD
        </button>
        <button onClick={() => handle("xagUsd")} className="ui primary button">
          XAG/USD
        </button>
      </div>
      <div style={{ marginTop: "5px", display: "flex" }}>
        <button onClick={() => handle("btc")} className="ui primary button">
          BITCOIN
        </button>
        <button onClick={() => handle("eth")} className="ui primary button">
          ETHEREUM
        </button>
        <button onClick={() => handle("ltc")} className="ui primary button">
          LITECOIN
        </button>
        <button
          onClick={() => handle("ethClassic")}
          className="ui primary button"
        >
          ETHEREUM CLASSIC
        </button>
        <button onClick={() => handle("iota")} className="ui primary button">
          IOTA
        </button>
        <button onClick={() => handle("xrp")} className="ui primary button">
          XRP
        </button>
      </div>
      <hr />
      <News alias={alias} lang={lang} />
    </div>
  );
}
export default App;
