import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

const News = ({ alias, lang }) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get(`https://pacific-scrubland-93804.herokuapp.com/puppeteer/news/${alias}?lang=${lang}`)
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
        <div className="accordionTitle" key={item.id}>
          <Accordion.Title active={state === i} index={i} onClick={handleClick}>
            <div className="accordionInnerTitle">
              <img className="accordionImg" src={item.sumImgURL} alt="" />
              <h4>
                <Icon name="dropdown" />
                {item.title}
              </h4>
            </div>
          </Accordion.Title>
          <Accordion.Title>
            <i>{item.dateTime}</i>
            <p>{item.spot.replace("Inversting.com", " ")}</p>
          </Accordion.Title>
          <Accordion.Content active={state === i}>
            {item.content.map((el) => {
              return <p>{el.replace("Inversting.com", " ")}</p>;
            })}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default News;
