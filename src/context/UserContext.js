import { createContext, useState } from "react";

const UserContext = createContext("");

export function UserProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ticketCost, setTicketCost] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [ticketDetails, setTicketDetails] = useState({
    screen: "Screen-1",
    username: "",
    name: "",
    time: "",
    quantity: 0,
    ticketId: [],
    total: 0,
  });

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        ticketCost,
        setTicketCost,
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
