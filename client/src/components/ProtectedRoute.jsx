import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    async function isLoggedin() {
      const token = JSON.parse(localStorage.getItem("token") || "false");

      if (!token) {
        await navigate("/login");
      }
    }
    isLoggedin();
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
