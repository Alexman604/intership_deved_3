import styled from "styled-components";

export const QuizScreen = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  button {
    text-align: center;
    font-size: 16px;
    color: ${({ c }) => c};
    background-color: ${({ bc }) => bc};
    border: 1px solid #56bab7;
    padding: 5px 30px;
    &:hover {
      cursor: pointer;
      border: 1px solid white;
      color: white;
    }
  }
`;
