import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Countdown from "./countdown";
import QizLoop from "./qizLoop";
import ReadyToStart from "./readyToStart";
import Results from "./results";
import { useAuth } from "../../store/useAuth";
import { updUserAnswered, updUserReadyToStart, usersRef } from "../../firebase/firebaseConnection";
import { onSnapshot } from "firebase/firestore";
import { changeAllAnswered, changeStatus } from "../../store/quizSlice";

function QuizComponent() {
  const quizStatus = useSelector((state) => state.questions.quizStatus);
  const [users, setUsers] = useState([]);
  const { userIdLogged } = useAuth();
  const dispatch = useDispatch();

  const checkUsersStatus = () => {
    if (users.length > 0) {
      if (users.map((user) => user.readyToStart).every(Boolean)) {
        dispatch(changeStatus("start"));
        updUserReadyToStart(userIdLogged, false);
      }

      if (users.map((user) => user.answered).every(Boolean)) {
        dispatch(changeAllAnswered(true));
        updUserAnswered(userIdLogged, false);
      }
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(usersRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unSub;
  }, []);

  useEffect(() => {
    checkUsersStatus();
  }, [users]);
  return (
    <>
      {quizStatus === "beforeStart" ? <ReadyToStart /> : null}
      {quizStatus === "ready" ? <Countdown /> : null}
      {quizStatus === "start" ? <QizLoop /> : null}
      {quizStatus === "result" ? <Results users={users} /> : null}
    </>
  );
}

export default QuizComponent;
