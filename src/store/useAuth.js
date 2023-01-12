import { useSelector } from "react-redux";

export function useAuth() {
  const { userName, userImage, userIdLogged } = useSelector((state) => state.user);
  return {
    isAuth: !!userName,
    userName,
    userImage,
    userIdLogged,
  };
}
