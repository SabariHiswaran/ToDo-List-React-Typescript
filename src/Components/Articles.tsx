import { useEffect, useState } from "react";

import { api_Key } from "../openaiapikey.js";
import Accordion from "react-bootstrap/Accordion";

interface articleProptype {
  articlesList: {
    id: string;
    todo: string;
    isDone: boolean;
    isChecked: boolean;
  };
  todoListLength: number;
}

const Articles = ({ articlesList, todoListLength }: articleProptype) => {
  const { id, todo, isDone, isChecked } = articlesList;

  const [chatGPTArticle, setChatGPTArticle] = useState<string>("");

  useEffect(() => {
    fetchArticleData();
  }, []);

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = api_Key; // add your own key here

  const fetchArticleData = async () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a usefull article regarding : ${todo}`,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const responseText = data.choices[0].message.content.trim();
        setChatGPTArticle(responseText);
      });
  };

  return (
    <div className="row">
      <div className="col-md-8 col-md-offset-2">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{todo}</Accordion.Header>
          <Accordion.Body>
            {chatGPTArticle.length === 0 ? (
              <p>Reference Article is Loading ....</p>
            ) : (
              <pre>{chatGPTArticle}</pre>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
    </div>
  );
};

export default Articles;
