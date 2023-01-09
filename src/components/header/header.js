import React from "react";
import logo from "./logo.png";
import { StyledHeader } from "../styled/header.styled";
import { Outlet, useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const onLogOut = () => {
    // dispatch(logoutUser());
    // localStorage.removeItem("userData");
    navigate("/login");
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
