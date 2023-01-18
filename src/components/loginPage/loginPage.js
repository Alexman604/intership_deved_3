import React from "react";
import { Container } from "../styled/container.styled";
import GoogleLogin from "../google_auth/google_login";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container minh="calc(100vh - 110px)">
      <Container minh="200px" bc="#232327" color="white" minw="450px" br="10px" fd="column" jc="space-evenly">
        <div id="login"> LOGIN</div>

        <GoogleLogin />

        <Link to="/signIn">
          <span>Sign in with e-mail</span>
        </Link>
        <Link to="/registration">
          <span >
            Register e-mail
          </span>
        </Link>
      </Container>
    </Container>
  );
}

export default LoginPage;
