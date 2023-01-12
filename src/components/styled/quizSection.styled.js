import styled from "styled-components";

export const QuizSection = styled.div`
  box-sizing: border-box;
  min-height: ${({ minh }) => minh};
  min-width: ${({ minw }) => minw};
  background-color: ${({ bc = "#2c2d32" }) => bc};
  display: flex;
  justify-content: center;
  align-items: center;
`;
