"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Page from "../_components/Page";

export default function Dashboard() {
  const session = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <Page>
      <h1>Protected Dashboard</h1>
      <p>Welcome!</p>
    </Page>
  );
}
