import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

const News = ({ alias, lang }) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get(`http://localhost:3000/puppeteer/news/${alias}?lang=${lang}`)
        .then((response) => {
          if (response) {
            return response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setData(data);
    };
    fetchData();
  }, [alias, lang]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = state === index ? -1 : index;
    setState(newIndex);
  };

  return (
    <Accordion>
      <div>
        <h2>{data.indiceName} News</h2>
        <br />
      </div>
      {data?.news?.map((item, i) => (
        <div key={item.id}>
          <Accordion.Title active={state === i} index={i} onClick={handleClick}>
            <h4>
              <Icon name="dropdown" />
              {item.title}
            </h4>
          </Accordion.Title>
          <Accordion.Title>
            <p>{item.spot}</p>
          </Accordion.Title>
          <Accordion.Content active={state === i}>
            {item.content.map((el) => {
              return <p>{el}</p>;
            })}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default News;
