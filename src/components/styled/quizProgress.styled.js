import styled from "styled-components";
import { Done } from "@styled-icons/material/Done";
import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";

export const GreenRight = styled(Done)`
  color: green;
  width: 30px;
`;
export const RedWrong = styled(CircleWithCross)`
  color: red;
  width: 30px;
`;

export const QuizProgress = styled.div`
  width: 300px;
  min-width: 300px;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
