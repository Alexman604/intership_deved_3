import React from 'react'
import { Container } from '../styled/container.styled'
import GoogleLogin from "../google_auth/google_login";

function LoginPage() {
  return (
    <Container minh="calc(100vh - 110px)">
      <Container minh="150px" bc="#232327" minw="450px" br="10px">
        <div id="login"> LOGIN</div>
        <GoogleLogin />
      </Container>
    </Container>
  );
}

export default LoginPage