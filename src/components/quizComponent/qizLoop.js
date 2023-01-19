import { useEffect, useState } from "react";
import { changeStatus, changeAllAnswered } from "../../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { QuizCard } from "../styled/quizCard.styled";
import { QuizProgress } from "../styled/quizProgress.styled";
import { GreenRight } from "../styled/quizProgress.styled";
import { RedWrong } from "../styled/quizProgress.styled";
import { useAuth } from "../../store/useAuth";
import { updUserAnswered } from "../../firebase/firebaseConnection";
import { updUserReadyToStart } from "../../firebase/firebaseConnection";

function QizLoop() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const allAnswered = useSelector((state) => state.questions.allAnswered);
  const meAnswered = useSelector((state) => state.questions.meAnswered);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState(false);
  const { userIdLogged } = useAuth();

  useEffect(() => {
    if (questions) {
      const inputIndex = Math.floor(Math.random() * 4);
      const answersList = questions[currentQuestionIndex].incorrect_answers.map((item) => item);
      answersList.splice(inputIndex, 0, questions[currentQuestionIndex].correct_answer);
      setAnswers(answersList);
    } else return <div>spinner</div>;
  }, [currentQuestionIndex]);

  useEffect(() => {
    updUserReadyToStart(userIdLogged, false);
  }, []);

  // console.log(questions);

  // console.log(answers);

  if (allAnswered && done) {
    if (currentQuestionIndex === questions.length - 1) {
      dispatch(changeStatus("result"));
    } else {
      setDone(false);
      dispatch(changeAllAnswered(false));
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  const onButton = (e) => {
    setDone(true);
    updUserAnswered(userIdLogged, true);
    //
    if (e.target.name === questions[currentQuestionIndex].correct_answer) {
      setProgress((progress) => [...progress, true]);

      // console.log("progress scores", progress);
    } else {
      setProgress((progress) => [...progress, false]);
      // console.log("progress scores", progress);
    }

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
        <button key={index} name={answ} onClick={onButton} disabled={done}>
          {answ}
        </button>
      );
    });
  };

  const buttons = renderButtons(answers);
  const progInfo = renderProgInfo(progress);

  return (
    <>
      <QuizProgress>{progInfo}</QuizProgress>
      <QuizCard cursor={done ? "not-allowed" : "pointer"}>
        <p>{questions[currentQuestionIndex].question}</p>;{buttons}
      </QuizCard>
    </>
  );
}

export default QizLoop;
