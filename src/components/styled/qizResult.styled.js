import styled from "styled-components";

export const QuizResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #232327;
  border-radius: 5px;
  min-height: 70%;
  padding: 20px;
  width: 400px;
  min-width: 300px;
  position: relative;
  div {
    display: flex;
    width: 95%;
    justify-content: space-around;
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        height: 35px;
        border-radius: 50%;
        margin-left: 25px;
      }
    }
  }

  p {
    color: white;
    text-align: center;
    margin: 10px;
  }
  button {
    position: absolute;
    bottom: 50px;
    color: #56bab7;
    padding: 10px;
    width: 120px;
    background-color: #232327;
    border: 1px solid #56bab7;
    cursor: ${({ cursor }) => cursor};
  }
`;
