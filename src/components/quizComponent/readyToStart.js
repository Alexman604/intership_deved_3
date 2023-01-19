import { QuizScreen } from "../styled/quzScreen.styled";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../store/quizSlice";

import { updUserReadyToStart } from "../../firebase/firebaseConnection";
import { useAuth } from "../../store/useAuth";

function ReadyToStart() {
  const dispatch = useDispatch();

  const {  userIdLogged } = useAuth();

const onStart = ()=> {
dispatch(changeStatus("ready"))
updUserReadyToStart(userIdLogged, true);
}

  return (
    <QuizScreen c="#56bab7" bc="rgba(255, 255, 255, 0)">
      <p>START if you are ready to start Quiz</p>
      <button onClick={() => onStart()}>START</button>
    </QuizScreen>
  );
}

export default ReadyToStart;
