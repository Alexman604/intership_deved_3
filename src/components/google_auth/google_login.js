import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { addUserToDB } from "../../firebase/firebaseConnection";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    if (userObject) {
      const { name, picture, sub } = userObject;
      document.getElementById("login").innerHTML = `Hello ${userObject.name}`;
      const userData = {
        userName: name,
        userImage: picture,
        userId: sub,
        readyToStart: false,
        answered: false,
        score: 0,
      };
      dispatch(loginUser(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
      addUserToDB(userObject)
      navigate("/");
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("login"), { theme: "outline", size: "big" });
  }, []);
};

export default GoogleLogin;
