"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [data, setData] = useState<{
    message: string;
    user: { username: string };
  }>();
  const router = useRouter();

  const fetchProtectedData = useCallback(
    async (token: string) => {
      const res = await fetch("/api/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setData(data);
      } else {
        router.push("/admin/sign-in"); // Redirect if the token is invalid
      }
    },
    [router],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/sign-in"); // Redirect to login if token is missing
    } else {
      fetchProtectedData(token);
    }
  }, [fetchProtectedData, router]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome, {data.user.username}!</p>
      <p>{data.message}</p>
    </div>
  );
}
