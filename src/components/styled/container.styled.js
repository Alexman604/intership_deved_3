import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;

  height: ${({ minh = "100%" }) => minh};
  min-width: ${({ minw }) => minw};
  width: ${({ width }) => width};
   background: url(${({ bi }) => bi}); 
  background-color: ${({ bc = "#2c2d32" }) => bc};
  border: ${({ border }) => border};
  border-radius: ${({ br }) => br};
  display: flex;
  justify-content: center;
  align-items: center;
`;
