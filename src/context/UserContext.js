import { createContext, useState } from "react";

const UserContext = createContext("");

export function UserProvider({ children }) {
  const [loginUser, setLoginUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    name: "",
    time: "",
    quantity: 0,
    ticketId:[],
    total: 0,
  });

  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
        ticketDetails,
        setTicketDetails,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
