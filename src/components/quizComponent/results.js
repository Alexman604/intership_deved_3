import React from "react";
import { useDispatch } from "react-redux";
import { changeStatus, deleteQuestionsFromStore } from "../../store/quizSlice";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { quizRef } from "../../firebase/firebaseConnection";
import { db } from "../../firebase/firebase";
const Results = () => {
  const dispatch = useDispatch();

  const deleQuestion = async (id) => {
    const qDoc = doc(db, "quiz", id);
    await deleteDoc(qDoc);
  };
  
  const deleteQuestionsFromDb = async () => {
    const querySnapshot = await getDocs(quizRef);
    querySnapshot.forEach((doc) => {
      console.log("deleting ",doc.id)
       deleQuestion(doc.id);

    });
  };

  const updDBQuiz = () => {
    //delete all questions from firestore
    console.log("questions deleted");

      dispatch(deleteQuestionsFromDb());
      deleteQuestionsFromStore()
     dispatch(changeStatus("beforeStart"));
  };


  return (
    <div>
      <button onClick={() => updDBQuiz()}>START</button>;
    </div>
  );
};

export default Results;
