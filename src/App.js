import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCards from "./components/MovieCard/MovieCards";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import ContactUs from "./pages/contactUs/ContactUs";
import Login from "./pages/login/Login";
import Payment from "./pages/payment-page/Payment";
import Signup from "./pages/signup/Signup";
import Ticket from "./pages/Ticket-page/Ticket";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieCards isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Ticket isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactUs isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
