import axios from "axios";
import React, { useEffect, useState } from "react";

const Indice = ({ handleClick }) => {
  const [indice, setIndice] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get("http://localhost:3000/puppeteer/indice")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      setIndice(data);
    };
    fetchData();
  }, []);

  function renderButton(value) {
    const data = value.map((item) => {
      return (
        <button
          onClick={(event) => handleClick(event, item.alias)}
          style={{ margin: "3px" }}
          className="ui primary button"
        >
          {item.name}
        </button>
      );
    });
    return data;
  }
  return (
    <div style={{ marginTop: "5px", display: "-ms-inline-flexbox" }}>
      {renderButton(indice)}
    </div>
  );
};

export default Indice;
