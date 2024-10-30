import Dashboard from "./dashboard/page";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";

export default async function Admin() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return <Dashboard />;
}
