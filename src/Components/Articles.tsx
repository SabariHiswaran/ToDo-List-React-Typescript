import { useEffect, useState } from "react";

interface articleProptype {
  articlesList: {
    id: string;
    todo: string;
    isDone: boolean;
    isChecked: boolean;
  };
}

const Articles = ({ articlesList }: articleProptype) => {
  const { id, todo, isDone, isChecked } = articlesList;

  const [chatGPTArticle, setChatGPTArticle] = useState<string[]>([]);

  useEffect(() => {
    fetchArticleData();
  }, []);

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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"; // add your own key here

  const fetchArticleData = async () => {
    fetch(apiUrl, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        //    "Access-Control-Allow-Origin": "*", //BAD IDEA
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
        const responseText = data.choices[0].message.content.trim();
        setChatGPTArticle((prevVal) => [...prevVal, responseText]);
      });
  };

  return (
    <div>
      {chatGPTArticle.map((article) => {
        return <pre>{article}</pre>;
      })}
    </div>
  );
};

export default Articles;
