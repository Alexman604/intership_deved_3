import styled from "styled-components";

export const QuizResults = styled.div`
  /* border: 1px solid #56bab7; */
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
      justify-content: space-around ;
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
    margin:10px;

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


// export const StyledMessage = styled.div`
//   position: ${({ pos }) => pos};
//   left: 27%;
//   display: flex;
//   flex-wrap: wrap;
//   width: 70%;
//   margin: 5px 10px;
//   align-items: center;

//   img {
//     height: 35px;
//     border-radius: 50%;
//     margin-left: 15px;
//   }
//   p {
//     margin: 0 5px;
//     font-size: 18px;
//     color: #56bab7;
//   }
//   p:last-child {
//     margin: 0;
//     width: 100%;
//     font-size: 18px;
//     color: white;
//     box-shadow: rgba(0, 0, 0, 0.7) 0px 4px 12px;
//     border-radius: 10px;
//     padding: 10px;
//   }
// `;
