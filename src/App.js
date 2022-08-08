import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCards from "./pages/movie-page/Movies";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import ContactUs from "./pages/contactUs/ContactUs";
import Login from "./pages/login/Login";
import Payment from "./pages/payment-page/Payment";
import Signup from "./pages/signup/Signup";
import Ticket from "./pages/Ticket-page/Ticket";
import { UserProvider } from "./context/UserContext";

const App = () => {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Ticket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
