import styled from "styled-components";

export const RegisterSignInForm = styled.form`
  width: 300px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  border: 1px solid #56bab7;
  background-color: #232327;
  color: #56bab7;
  border-radius: 5px;
  padding: 10px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50px;
    margin-bottom: 5px;
    input {
      padding: 2px 6px;
      width: 280px;
      font-size: 20px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.7) 0px 4px 12px;
      background-color: rgba(255, 255, 255, 0.2);
      color: #56bab7;
      margin-bottom: 5px;
      border: none;
      &::placeholder {
        color: #56bab7;
        opacity: 0.3;
      }
      &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    small {
      font-size: 14px;
      vertical-align: top;
      color: red;
    }
  }
  button {
    text-align: center;
    font-size: 16px;
    color: #56bab7;
    background-color: #232327;
    border: 1px solid #56bab7;
    padding: 5px 30px;
    &:hover {
      cursor: pointer;
      border: 1px solid white;
      color: white;
    }
  }
`;
