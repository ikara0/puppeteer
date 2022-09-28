import React, { useState } from "react";
import News from "./News";

function App() {
  const [alias, setAlias] = useState("apple");
  const [lang, setLanguage] = useState("en");
  function handle(id) {
    setAlias(id);
  }
  return (
    <div className="ui container">
      <div style={{ marginTop: "5px" }}>
        <button onClick={() => handle("apple")} className="ui primary button">
          APPLE
        </button>
        <button onClick={() => handle("dow")} className="ui primary button">
          DOW JONES
        </button>

        <select
          style={{ marginLeft: "70%" }}
          className="ui dropdown"
          value={lang}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>
      <hr />
      <News alias={alias} lang={lang} />
    </div>
  );
}
export default App;
