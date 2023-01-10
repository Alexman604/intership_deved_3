
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate(); 
 const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    if (userObject) {
      const {name, picture, sub  } = userObject
      console.log(userObject);
      document.getElementById("login").innerHTML = `Hello ${userObject.name}`;

      const userData = {
            userName: name,
            userImage: picture,
            userId: sub,
    }

 dispatch(loginUser(userData));
   localStorage.setItem("userData", JSON.stringify(userData));
   navigate("/");
  };
  }


useEffect  (()=> {

  /*global google*/
  google.accounts.id.initialize({
    client_id: process.env.REACT_APP_GOOGLE_ID,
    callback: handleCallbackResponse,
  });
  google.accounts.id.renderButton(document.getElementById("login"), { theme: "outline", size: "big" });
}, [])



 
  
  
}

export default GoogleLogin;
