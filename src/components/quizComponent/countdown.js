import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { quizRef } from "../../firebase/firebaseConnection";
import { changeStatus } from "../../store/quizSlice";
import { QuizScreen } from "../styled/quzScreen.styled";
import { fetchQuestions, setQuestions } from "../../store/quizSlice";
import { collection, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../../store/useAuth";
import { updUserReadyToStart } from "../../firebase/firebaseConnection";

function Countdown() {

  const dispatch = useDispatch();

  const { userIdLogged } = useAuth();

  const onCancel = () => {
    dispatch(changeStatus("beforeStart"));
    updUserReadyToStart(userIdLogged, false);
  };
  useEffect(() => {
    const getQuestionsFromDb = async () => {
      const querySnapshot = await getDocs(quizRef);
      console.log("querySnapshot length", querySnapshot.docs.length);
      if (querySnapshot.docs.length === 0) {
        console.log("getting questions from API and saving to store and export to DB");
        dispatch(fetchQuestions());
      } else {
        
       
        querySnapshot.forEach((doc) => {
          console.log("adding to store", doc.data());
         dispatch( setQuestions(doc.data()));
        });
      }
    };
    getQuestionsFromDb();
  }, []);

  useEffect(() => {


    return () => {
      // clearTimeout(countdownTimer);
      // console.log("cleared");
    };
  }, []);

  return (
    <QuizScreen c="white" bc="#56bab7">
      <p>Ready to start The Quiz</p>
      <button onClick={() => onCancel()}>CANCEL</button>
      {/* <p>{countdown}</p> */}
    </QuizScreen>
  );
}

export default Countdown;
