import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const usePasswordReset = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, passwordReset };
};