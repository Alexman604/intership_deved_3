import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { quizRef } from "../../firebase/firebaseConnection";
import { changeStatus } from "../../store/quizSlice";
import { QuizScreen } from "../styled/quzScreen.styled";
import { fetchQuestions, setQuestions } from "../../store/quizSlice";
import { collection, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";

function Countdown() {
  const [countdown, setCountdown] = useState(3);
  const dispatch = useDispatch();

  let countdownTimer = setTimeout(function () {
    if (countdown <= 1) {
      dispatch(changeStatus("start"));
    } else {
      setCountdown(countdown - 1);
    }
  }, 1000);

  useEffect(() => {
    const getQuestionsFromDb = async () => {
      const querySnapshot = await getDocs(quizRef);
      console.log("querySnapshot length", querySnapshot.docs.length);
      if (querySnapshot.docs.length === 0) {
        console.log("getting questions from API and saving to store and export to DB");
        dispatch(fetchQuestions());
      } else {
        console.log("adding to store");
        querySnapshot.forEach((doc) => {
          setQuestions(doc.data());
        });
      }
    };
    getQuestionsFromDb();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(countdownTimer);
      // console.log("cleared");
    };
  }, []);

  return (
    <QuizScreen c="white" bc="#56bab7">
      <p>Ready to start The Quiz</p>
      <button onClick={() => dispatch(changeStatus("beforeStart"))}>CANCEL</button>
      <p>{countdown}</p>
    </QuizScreen>
  );
}

export default Countdown;
