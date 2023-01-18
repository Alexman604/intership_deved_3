import React from "react";
import logo from "./logo.png";
import { StyledHeader } from "../styled/header.styled";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../store/useAuth";
import { removeUserFromDB } from "../../firebase/firebaseConnection";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const { isAuth, userIdLogged } = useAuth();

  // console.log(userIdLogged);

  const onLogOut = () => {
    removeUserFromDB(userIdLogged); 
    dispatch(logoutUser());
    localStorage.removeItem("userData");

    navigate("/login");
    signOut(auth)
      .then(() => {
        // console.log("logout ok");
      })
      .catch((error) => {});
  };

  return (
    <>
      <StyledHeader display={!isAuth ? "none" : null}>
        <img src={logo} alt="logo" />
        <p onClick={() => onLogOut()}>Logout</p>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default Header;
