import axios from "axios";
import React, { useState, useEffect } from "react";

function Quiz() {
  const [question, setQuestion] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  //   const [answer, setAnswer] = useState({});
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get("http://localhost:8000/questions");
        setQuestion(res.data);
        setSelectedAnswer(Array(res.data.length).fill(null));
      } catch (error) {
        console.log("Error");
      }
    }
    fetchQuestions();
  }, []);

  const handleChange = (index, selectedOption) => {
    const updatedAnswer = [...selectedAnswer];
    updatedAnswer[index] = selectedOption;
    setSelectedAnswer(updatedAnswer);
    console.log(selectedAnswer);
  };

  const handleSubmit = async () => {
    try {
      let obj = {};
      console.log(selectedAnswer);
      for (let i = 0; i < question.length; i++) {
        obj[question[i].id] = question[i].answer[selectedAnswer[i]];
      }

      await axios.post("http://localhost:8000/questions", {ans:obj});
      console.log("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-9 mb-10">
      <h1>Quiz</h1>
      {question.map((questionData, index) => (
        <div key={index} className="bg-zinc-300 h-52 w-52 p-5 flex flex-col">
          <div className="grid grid-cols-2">{questionData.question}</div>
          <div className="grid grid-cols-2">
            {questionData.answer.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center">
                <input
                  type="radio"
                  checked={selectedAnswer[index] === optionIndex}
                  onChange={() => handleChange(index, optionIndex)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="bg-cyan-500" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Quiz;
