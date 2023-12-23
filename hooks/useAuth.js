import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/config";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return { user };
};

export default useAuth;
