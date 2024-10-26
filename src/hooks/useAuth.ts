"use client";

import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (error: unknown) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = () => {
    setIsAuthenticated(false);
    setLoading(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
    } else {
      verifyToken(token); // Check the validity of the token
    }
  }, [verifyToken]);

  return { isAuthenticated, loading, signOut };
};
