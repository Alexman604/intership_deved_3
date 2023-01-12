import styled from "styled-components";

export const StyledMessage = styled.div`
  position: ${({ pos }) => pos};
  left: 27%;
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 5px 10px;
  align-items: center;

  img {
    height: 35px;
    border-radius: 50%;
    margin-left: 15px;
  }
  p {
    margin: 0 5px;
    font-size: 18px;
    color: #56bab7;
  }
  p:last-child {
    margin: 0;
    width: 100%;
    font-size: 18px;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 4px 12px;
    border-radius: 10px;
    padding: 10px;
  }
`;
