import styled from "styled-components";

export const QuizCard = styled.div`
  border: 1px solid #56bab7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #232327;
  border-radius: 5px;
  min-height: 70%;

  width: 300px;
  min-width: 300px;
  p {
    color: white;
    text-align: center;
    padding: 10px;
  }
  button {
    color: #56bab7;
    padding: 5px;
    width: 90%;
    background-color: #232327;
    border: 1px solid #56bab7;
    cursor: ${({ cursor }) => cursor};
  }
`;
