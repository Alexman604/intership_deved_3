import { QuizScreen } from "../styled/quzScreen.styled";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../store/quizSlice";

function ReadyToStart() {
  const dispatch = useDispatch();
  return (
    <QuizScreen c="#56bab7" bc="rgba(255, 255, 255, 0)">
      <p>START if you are ready to start Quiz</p>
      <button onClick={() => dispatch(changeStatus("ready"))}>START</button>
    </QuizScreen>
  );
}

export default ReadyToStart;
