import React from "react";
import logo from "./logo.png";
import { StyledHeader } from "../styled/header.styled";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const onLogOut = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userData");
    navigate("/login");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logout ok");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <StyledHeader>
        <img src={logo} alt="logo" />
        <p onClick={() => onLogOut()}>Logout</p>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default Header;
