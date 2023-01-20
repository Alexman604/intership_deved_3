import React from "react";
import { useDispatch } from "react-redux";
import { changeStatus, deleteQuestionsFromStore } from "../../store/quizSlice";
import { useAuth } from "../../store/useAuth";
import { deleteQuestionsFromDb, updUserScore } from "../../firebase/firebaseConnection";
import { QuizResults } from "../styled/qizResult.styled";

const Results = ({ users }) => {
  console.log(users);

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

  const renderScores = (arr) => {
    return arr.map(({ userImage, userName, score }) => {
      console.log(userImage, userName, score);
      return (

        <div>
          <div>
          <img src={userImage} alt="" />
          <p>{userName}</p>
        </div>
        <div>
          <p>{score}</p>
        </div>
        </div>
        
      );} );
  }



const scoresList = renderScores(users)
  return (
    <QuizResults>
      <div> <p>USER</p>
      <p>SCORES</p></div>
     
      {scoresList}

      <button onClick={() => updDBQuiz()}>OK</button>
    </QuizResults>
  );
};

export default Results;
