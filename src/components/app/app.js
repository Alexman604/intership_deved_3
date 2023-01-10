import Header from "../header/header";

import LoginPage from "../loginPage/loginPage";
import MainPage from "../mainPage/mainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "../../firebase/firebase"
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/useAuth";
import { loginUser } from "../../store/userSlice";
import { useEffect } from "react";

function App() {

 const dispatch = useDispatch();
 const { isAuth } = useAuth();

  const getDataFromLS = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { userName, userImage, userId } = userData;
      dispatch(loginUser({ userName: userName, userImage: userImage, userId: userId }));
    }
  };

  useEffect(() => {

    getDataFromLS();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<MainPage />} />
        <Route path="/login" exact element={!isAuth ? <LoginPage /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
