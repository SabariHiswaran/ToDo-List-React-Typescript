import { useEffect, useState } from "react";

interface articleProptype {
  articlesList: {
    id: string;
    todo: string;
    isDone: boolean;
    isChecked: boolean;
  };
  todoListLength : number
}

const Articles = ({ articlesList,todoListLength }: articleProptype) => {
  const { id, todo, isDone, isChecked } = articlesList;

  const [chatGPTArticle, setChatGPTArticle] = useState<string[]>([]);

  useEffect(() => {
    fetchArticleData();
  }, []);

  console.log(chatGPTArticle)

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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"; // add your own key here

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
        console.log(data)
        const responseText = data.choices[0].message.content.trim();
        setChatGPTArticle((prevVal) => [...prevVal, responseText]);
      });
  };

  return chatGPTArticle.length === 0 ? (
    <div>
        Reference Articles are Loading ....
    </div>
  )
  :
  (
   <div>
      {chatGPTArticle?.map((article,index) => {
        return (
        <>
          <div className="article-div" key={index}>
        <pre>{article}</pre>
        <hr/>
        </div>
        </>
      )
      })}
    
    </div>
  )
};

export default Articles;
