import React from "react";
import { StyledMessage } from "../styled/message.styled";

function Message({ userIdLogged, ...props }) {
  const { message, userName, userImage, userId } = props;

  return (
    <StyledMessage pos={userId === userIdLogged ? "relative" : null}>
      <img src={userImage} alt="" />
      <p>{userName}</p>
      <p>{message}</p>
    </StyledMessage>
  );
}

export default Message;
