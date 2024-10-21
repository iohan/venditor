"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/admin/sign-in");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <>...Loading</>;
  }

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome!</p>
    </div>
  );
}
