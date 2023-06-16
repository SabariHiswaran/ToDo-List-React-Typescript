import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Container,Row,Col } from "react-bootstrap";

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
  const { todo } = articlesList;
 
  const [chatGPTArticle, setChatGPTArticle] = useState<string>("");

  useEffect(() => {
    setChatGPTArticle("")
    fetchArticleData();
  }, [todo]);

  const apiUrl = "https://server-todolist-crn2.onrender.com"

  const fetchArticleData = async () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({user:todo})
    })
      .then((response) =>{
      console.log(response)
     return response.json()
      }
       )
      .then((data) => {
        if(data.error){
          if(data.error.message !== ""){
            setChatGPTArticle(data.error.message)
          }
          else{
          setChatGPTArticle("Something went wrong, Pleast try again after sometime.")
          }
        }
        else{
        const responseText = data.choices[0].message.content.trim();
        setChatGPTArticle(responseText);
        }
      });
  };

  return (  
    <Container className="p-2">
      <Row>
        
        <Col lg={2}></Col>

      <Col lg={8}>
      <Accordion>
        <Accordion.Item eventKey="0" >
          <Accordion.Header>{todo}</Accordion.Header>
          <Accordion.Body>
            {chatGPTArticle.length === 0 ? (
              <p> Reference Article is Loading ....</p>
            ) : (
              <pre>{chatGPTArticle}</pre>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Col>

      <Col lg={2}></Col>

      </Row>

    </Container>
  );
};

export default Articles;
