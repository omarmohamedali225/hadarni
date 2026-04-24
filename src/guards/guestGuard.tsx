import React, { useEffect } from "react";
import { useAuth } from "../lib/Auth";
import { useNavigate } from "react-router-dom";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return <>{!user ? children : <></>}</>;
}
