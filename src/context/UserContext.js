import { createContext, useState } from "react";

const UserContext = createContext("");

export function UserProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [ticketDetails, setTicketDetails] = useState({
    username: "",
    name: "",
    time: "",
    quantity: 0,
    ticketId: [],
    total: 0,
    screen: "Screen-1",
  });

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
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
