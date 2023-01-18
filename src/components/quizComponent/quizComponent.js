import { useSelector } from "react-redux";
import Countdown from "./countdown";
import QizLoop from "./qizLoop";
import ReadyToStart from "./readyToStart";
import Results from "./results";

function QuizComponent() {
  const quizStatus = useSelector((state) => state.questions.quizStatus);


  if (quizStatus === "beforeStart") return <ReadyToStart />;

  if (quizStatus === "ready") return <Countdown />;

  if (quizStatus === "start") return <QizLoop />;

  if (quizStatus === "result") return <Results />;
}

export default QuizComponent;
