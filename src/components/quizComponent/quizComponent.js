import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Countdown from "./countdown";
import QizLoop from "./qizLoop";
import ReadyToStart from "./readyToStart";
import Results from "./results";
import { usersRef } from "../../firebase/firebaseConnection";
import { onSnapshot } from "firebase/firestore";
import { changeStatus } from "../../store/quizSlice";

function QuizComponent() {
  const quizStatus = useSelector((state) => state.questions.quizStatus);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const checkUsersReadyStatus = () => {
    if (users.length > 1) {
      let listOfUsersReady = users.map((user) => user.readyToStart);
      console.log(listOfUsersReady);

      if (listOfUsersReady.every(Boolean)) {
        dispatch(changeStatus("start"));
        console.log("Pushing start  quiz");
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
    checkUsersReadyStatus();
  }, [users]);

  if (quizStatus === "beforeStart") return <ReadyToStart />;

  if (quizStatus === "ready") return <Countdown />;

  if (quizStatus === "start") return <QizLoop />;

  if (quizStatus === "result") return <Results />;
}

export default QuizComponent;
