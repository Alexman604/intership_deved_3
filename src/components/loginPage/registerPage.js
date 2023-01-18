import { Container } from "../styled/container.styled";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useForm } from "react-hook-form";
import { RegisterSignInForm } from "../styled/registerSignInForm.styled";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    watch,
  } = useForm();

  async function onHandleSubmit(data) {
    console.log(data);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password, data.name);

      alert("User Created Successfully");
      navigate("/signIn");

      updateProfile(auth.currentUser, {
        displayName: data.name,
      })
        .then(() => {
          console.log("updated name");
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    } catch (error) {
      console.log(error);
      alert("User created failed");
      alert(error);
    }
  }

  return (
    <Container minh="calc(100vh - 110px)">
      <RegisterSignInForm onSubmit={handleSubmit(onHandleSubmit)}>
        <h3>Create an account</h3>
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
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                validate: (value) => value === watch("password", "") || "The passwords do not match",
              })}
              autoComplete="off"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              error={errors.confirmPassword}
              required={true}
              onKeyUp={() => {
                trigger("confirmPassowrd");
              }}
            />
            {errors.confirmPassword ? <small>{errors.confirmPassword.message} </small> : null}
          </div>
          <div>
            <input
              name="name"
              type="name"
              required={true}
              placeholder="Your nickname"
              defaultValue=""
              {...register("name", { required: "Nickname is Required!!!" })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name ? <small>Nickname is Required!!!</small> : null}
          </div>
          <div>
            <button>Create an account</button>
          </div>
        </>
      </RegisterSignInForm>
    </Container>
  );
};

export default RegisterPage;
