"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Products() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>Products</>;
}
