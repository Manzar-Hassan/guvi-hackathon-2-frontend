import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(UserContext)

  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={"/"} replace />
  }

  return children;
}

export default ProtectedRoute;
