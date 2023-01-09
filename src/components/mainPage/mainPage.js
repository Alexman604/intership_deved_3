import React from 'react'
import ChatComponent from '../chatComponent/chatComponent'
import QuizComponent from '../quizComponent/quizComponent'
import wallpaper from './wallpaper.png'
import { Container } from '../styled/container.styled'

function MainPage() {
  return (
    <Container minh="calc(100vh - 110px)">
      <Container width="60%">
        <QuizComponent />
      </Container>
      <Container width="40%" border="1px solid white" br="5px" bi={wallpaper}>
        <ChatComponent />
      </Container>
     
    </Container>
  );
}

export default MainPage