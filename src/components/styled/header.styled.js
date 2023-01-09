import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: #232327;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  img {
    height: 70%;
  }
  p {
    font-size: 20px;
    color: #56bab7;
    border: 1px solid #56bab7;
    padding: 5px 30px;
    &:hover {
      cursor: pointer;
      border: 1px solid white;
      color: white;
    }
  }
`;
