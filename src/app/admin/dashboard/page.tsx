"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  if (session.status === "loading") {
    return <>...Loading</>;
  }

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome!</p>
    </div>
  );
}
