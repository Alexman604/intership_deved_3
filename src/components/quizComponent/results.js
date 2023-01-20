import React from "react";
import { useDispatch } from "react-redux";
import { changeStatus, deleteQuestionsFromStore } from "../../store/quizSlice";
import { useAuth } from "../../store/useAuth";
import { deleteQuestionsFromDb, updUserScore } from "../../firebase/firebaseConnection";

const Results = ({...users}) => {
console.log(users)

  const dispatch = useDispatch();
  const { userIdLogged } = useAuth();

  const updDBQuiz = () => {
    //delete all questions from firestore
    console.log("questions deleted");
    updUserScore(userIdLogged, "reset");
    deleteQuestionsFromDb();
    dispatch(deleteQuestionsFromStore());
    dispatch(changeStatus("beforeStart"));
  };

  return (
    <div>
      <button onClick={() => updDBQuiz()}>START</button>;
    </div>
  );
};

export default Results;
