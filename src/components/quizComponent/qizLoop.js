import { useEffect, useState } from "react";
import { changeStatus, addScores } from "../../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { QuizCard } from "../styled/quizCard.styled";
import { QuizProgress } from "../styled/quizProgress.styled";
import { GreenRight } from "../styled/quizProgress.styled";
import { RedWrong } from "../styled/quizProgress.styled";

function QizLoop() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState([]);
  const [result, setResult] = useState(0);


  // console.log(questions);

  //console.log(answers);

  const onButton = (e) => {
    if (e.target.name === questions[currentQuestionIndex].correct_answer) {
      dispatch(addScores());
      setProgress((progress) => [...progress, true]);

      // console.log("progress scores", progress);
    } else {
      setProgress((progress) => [...progress, false]);
      // console.log("progress scores", progress);
    }
    if (currentQuestionIndex === questions.length - 1) {
      // console.log("progress scores", progress);
      // console.log("scores", result);
      dispatch(changeStatus("result"));
    } else setCurrentQuestionIndex(currentQuestionIndex + 1);
    // console.log("progress", progress);
  };

  const renderProgInfo = (arr) => {
    return arr.map((item) => {
      return item ? <GreenRight key={Math.random()} /> : <RedWrong key={Math.random()} />;
    });
  };

  const renderButtons = (arr) => {
    if (arr.length === 0) {
      return <h5>Spinner</h5>;
    }
    return arr.map((answ, index) => {
      return (
        <button key={index} name={answ} onClick={onButton}>
          {answ}
        </button>
      );
    });
  };

  const buttons = renderButtons(answers);
  const progInfo = renderProgInfo(progress);
  useEffect(() => {
    if (questions) {
      const inputIndex = Math.floor(Math.random() * 4);
      const answersList = questions[currentQuestionIndex].incorrect_answers.map((item) => item);
      answersList.splice(inputIndex, 0, questions[currentQuestionIndex].correct_answer);
      setAnswers(answersList);
    }
    return () => {
      // console.log(result);
    };
  }, [currentQuestionIndex]);

  return (
    <>
      <QuizProgress>{progInfo}</QuizProgress>
      <QuizCard>
        <p>{questions[currentQuestionIndex].question}</p>;{buttons}
      </QuizCard>
    </>
  );
}

export default QizLoop;
