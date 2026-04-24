import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import GuestGuard from "./guards/guestGuard";
import AuthGuard from "./guards/authGuard";

export default function App() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
    </Routes>
  );
}
