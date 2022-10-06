import React, { useState } from "react";
import News from "./News";
import Indice from "./Indice";

import "./css/style.css";

function App() {
  const [alias, setAlias] = useState("apple");
  const [lang, setLanguage] = useState("en");
  const handleClick = (event, alias) => {
    setAlias(alias);
  };

  return (
    <div className="ui container">
      <div>
        <select
          className="ui dropdown"
          value={lang}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>
      <Indice handleClick={handleClick} />
      <hr />
      <News alias={alias} lang={lang} />
    </div>
  );
}
export default App;
