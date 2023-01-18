import React from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../store/quizSlice";
import { collection, getDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
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
      //  setQuiz({ id: doc.id, ...doc.data() });
      // doc.data() is never undefined for query doc snapshots
    });
  };

  const updFirestoreQuiz = () => {
    //delete all questions from firestore
    console.log("questions deleted");
    //  deleteQuestionsFromDb();
     dispatch(changeStatus("beforeStart"));
  };


  return (
    <div>
      <button onClick={() => updFirestoreQuiz()}>START</button>;
    </div>
  );
};

export default Results;
