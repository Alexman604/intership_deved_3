import { Container } from "../styled/container.styled";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/userSlice";
import { RegisterSignInForm } from "../styled/registerSignInForm.styled";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    reset,
  } = useForm();

const onHandleSubmit  = (data) =>{
    // console.log(data);
 signInWithEmailAndPassword(auth, data.email, data.password)
   .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
     const userData = {
       userName: user.displayName,
       userImage: "https://random.imagecdn.app/150/150",
       userId: user.uid,
     };
    dispatch(loginUser(userData));
    localStorage.setItem("userData", JSON.stringify(userData));
    alert(`Wellcome, ${user.displayName} ` );
    navigate("/");

     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;

    console.log(errorMessage);
     alert(errorMessage, "code:", errorCode);
     reset();
   });



    
  }

  return (
    <Container minh="calc(100vh - 110px)">
      <RegisterSignInForm onSubmit={handleSubmit(onHandleSubmit)}>
        <h3>Sign In</h3>
        <>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required={true}
              placeholder="Your email address"
              {...register("email", {
                required: "Email is Required!!!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
              onKeyUp={() => {
                trigger("email");
              }}
            ></input>
            {errors.email ? <small>{errors.email.message}</small> : null}
          </div>

          <div>
            <input
              name="password"
              id="password"
              type="password"
              autoComplete="off"
              required={true}
              placeholder="Your password"
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must be more than 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters",
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
              error={errors.password}
            ></input>
            {errors.password ? <small>{errors.password.message}</small> : null}
          </div>

          <div>
            <button>Sign In</button>
          </div>
        </>
      </RegisterSignInForm>
    </Container>
  );
};

export default SignInPage;


