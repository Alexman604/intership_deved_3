import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { quizRef } from "../../firebase/firebaseConnection";
import { changeStatus } from "../../store/quizSlice";
import { QuizScreen } from "../styled/quzScreen.styled";
import { fetchQuestions, setQuestions } from "../../store/quizSlice";
import { getDocs } from "firebase/firestore";
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

      if (querySnapshot.docs.length === 0) {
        dispatch(fetchQuestions());
      } else {
        querySnapshot.forEach((doc) => {
          dispatch(setQuestions(doc.data()));
        });
      }
    };
    getQuestionsFromDb();
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
