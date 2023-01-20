import { useEffect, useState } from "react";
import { changeStatus, changeAllAnswered } from "../../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { QuizCard } from "../styled/quizCard.styled";
import { QuizProgress } from "../styled/quizProgress.styled";
import { GreenRight } from "../styled/quizProgress.styled";
import { RedWrong } from "../styled/quizProgress.styled";
import { useAuth } from "../../store/useAuth";
import { updUserAnswered, updUserScore } from "../../firebase/firebaseConnection";
import { updUserReadyToStart } from "../../firebase/firebaseConnection";
import Loading from "../styled/loading.styled";

function QizLoop() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const allAnswered = useSelector((state) => state.questions.allAnswered);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState();
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState(false);
  const { userIdLogged } = useAuth();

  const createAnswersList = () => {
    const answersList = questions[currentQuestionIndex].incorrect_answers.map((item) => item);
    answersList.splice(Math.floor(Math.random() * 4), 0, questions[currentQuestionIndex].correct_answer);
    const buttons = answersList.map((answ, index) => {
      return (
        <button key={index} name={answ} onClick={onButton} disabled={done}>
          {answ}
        </button>
      );
    });
    setAnswers(buttons);
  };

  useEffect(() => {
    if (questions.length !== 0) {
      createAnswersList();
    }
  }, [questions, currentQuestionIndex, done]);

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
    updUserAnswered(userIdLogged, true);
    setDone(true);
    //
    if (e.target.name === questions[currentQuestionIndex].correct_answer) {
      setProgress((progress) => [...progress, true]);
      updUserScore(userIdLogged, "plusone");
    } else {
      setProgress((progress) => [...progress, false]);
    }
  };

  const renderProgInfo = (arr) => {
    return arr.map((item) => {
      return item ? <GreenRight key={Math.random()} /> : <RedWrong key={Math.random()} />;
    });
  };

  if (questions.length === 0) {
    return <Loading />;
  }

  const progInfo = renderProgInfo(progress);

  return (
    <>
      <QuizProgress>{progInfo}</QuizProgress>
      <QuizCard cursor={done ? "not-allowed" : "pointer"}>
        <p>{questions[currentQuestionIndex].question}</p>
        {!answers ? <Loading /> : answers}
      </QuizCard>
    </>
  );
}

export default QizLoop;
