import Header from "../header/header";
import LoginPage from "../loginPage/loginPage";
import MainPage from "../mainPage/mainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { useAuth } from "../../store/useAuth";
import { loginUser } from "../../store/userSlice";
import { useEffect } from "react";

import RegisterPage from "../loginPage/registerPage";
import SignInPage from "../loginPage/signInPage";
import { addUserToDB} from "../../firebase/firebaseConnection";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const getDataFromLS = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      // console.log(userData);

      dispatch(loginUser(userData));
      addUserToDB(userData);
    }
  };

  useEffect(() => {
    getDataFromLS();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route index element={<MainPage />} />
        <Route path="/login" exact element={!isAuth ? <LoginPage /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
