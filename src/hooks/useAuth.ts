// hooks/useAuth.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token"); // Remove invalid token
        setIsAuthenticated(false);
      }
    } catch (error: unknown) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading state once verification is complete
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
    } else {
      verifyToken(token); // Check the validity of the token
    }
  }, [router, verifyToken]);

  return { isAuthenticated, loading };
};
