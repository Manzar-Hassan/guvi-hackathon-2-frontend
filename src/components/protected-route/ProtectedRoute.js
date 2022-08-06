import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  isLoggedIn = true
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={"/"} replace />
  }

  return children;
}

export default ProtectedRoute;
