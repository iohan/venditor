import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <>Products</>;
}
