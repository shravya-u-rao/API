import axios from "axios";
import React, { useState, useEffect } from "react";

function Quiz() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get("http://localhost:8000/questions");
        setQuestion(res.data);
      } catch (error) {
        console.log("Error");
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="bg-zinc-300  flex flex-col justify-center items-center">
      <h1>Quiz</h1>
      {question.map((question, index) => (
        <div key={index} className="">
          <div>{question.question}</div>
          <div>{question.answer}</div>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
