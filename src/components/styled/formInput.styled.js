import styled from "styled-components";

export const FormInput = styled.form`
  height: 100%;
  min-width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  textarea {
    margin: 5px;
    height: 80%;
    width: 80%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 16px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  button {
    text-align: center;
    width: 20%;
    font-size: 16px;
    margin-top: 5px;
    color: #56bab7;
    border: 1px solid #56bab7;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      cursor: pointer;
      border: 1px solid white;
      color: white;
    }
  }
`;
