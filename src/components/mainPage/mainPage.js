import React from 'react'
import ChatComponent from '../chatComponent/chatComponent'
import QuizComponent from '../quizComponent/quizComponent'
import wallpaper from './wallpaper.png'
import { Container } from '../styled/container.styled'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../store/useAuth";

function MainPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, []);

  return (
    <Container minh="calc(100vh - 110px)">
      <Container width="60%">
        <QuizComponent />
      </Container>
      <Container width="40%" border="1px solid white" br="5px" bi={wallpaper} fd = 'column'>
        <ChatComponent />
      </Container>
     
    </Container>
  );
}

export default MainPage