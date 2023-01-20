import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Countdown from "./countdown";
import QizLoop from "./qizLoop";
import ReadyToStart from "./readyToStart";
import Results from "./results";
import { useAuth } from "../../store/useAuth";
import { updUserAnswered, usersRef } from "../../firebase/firebaseConnection";
import { onSnapshot } from "firebase/firestore";
import { changeAllAnswered, changeStatus } from "../../store/quizSlice";

function QuizComponent() {
  const quizStatus = useSelector((state) => state.questions.quizStatus);
  const [users, setUsers] = useState([]);
   const { userIdLogged } = useAuth();
  const dispatch = useDispatch();

  const checkUsersStatus = () => {
    if (users.length > 0) {
      /////ready to start quiz
      let listOfUsersReady = users.map((user) => user.readyToStart);
     // console.log(listOfUsersReady);

      if (listOfUsersReady.every(Boolean)) {
        console.log(listOfUsersReady.every(Boolean));
        dispatch(changeStatus("start"));
       // console.log("Pushing start  quiz");
      }
      ///answered
      let listOfUsersAnswered = users.map((user) => user.answered);
      if (listOfUsersAnswered.every(Boolean)) {
      console.log("switching answered in bd and lockal state")
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

  if (quizStatus === "beforeStart") return <ReadyToStart />;

  if (quizStatus === "ready") return <Countdown />;

  if (quizStatus === "start") return <QizLoop />;

  if (quizStatus === "result") return <Results user = {users}/>;
}

export default QuizComponent;
