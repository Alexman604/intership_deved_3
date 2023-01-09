import React from 'react'
import { Container } from '../styled/container.styled'

function LoginPage() {
  return (
    <Container minh="calc(100vh - 110px)">
      <Container minh="150px" bc="#232327" minw='450px' br = '10px'>
        <button>LOGIN GOOGLE</button>
      </Container>
    </Container>
  );
}

export default LoginPage