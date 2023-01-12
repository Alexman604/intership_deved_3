import styled from "styled-components";

export const Container = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  box-sizing: border-box;
  height: ${({ minh = "100%" }) => minh};
  min-width: ${({ minw }) => minw};
  width: ${({ width }) => width};
  background: url(${({ bi }) => bi});
  background-color: ${({ bc = "#2c2d32" }) => bc};
  border: ${({ border }) => border};
  border-radius: ${({ br }) => br};
  display: flex;
  justify-content: ${({ jc = "center" }) => jc};
  flex-direction: ${({ fd }) => fd};
  align-items: ${({ ai = "center" }) => ai};
  overflow: ${({ overflow }) => overflow};
  &::-webkit-scrollbar {
    display: none;
  }
`;
