"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pinkBeenies from "@/images/pink-beenies.webp";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/admin");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <>...Loading</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // Store JWT token in LocalStorage
      router.push("/admin"); // Redirect to dashboard
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="bg-red-100 px-10 h-screen flex items-center relative">
      <div className="absolute top-0 left-0">
        <Link
          href="/"
          className="flex gap-x-1 m-3 word whitespace-nowrap border border-red-100 rounded-md py-1 px-2 hover:text-amber-800 hover:border-red-300"
        >
          <ChevronLeft /> Shop
        </Link>
      </div>
      <div className="bg-white rounded-xl flex overflow-hidden container mx-auto lg:w-10/12 xl:max-w-4xl">
        <div className="min-w-96 p-10">
          <h1 className="text-3xl">Get started</h1>
          <div className="text-stone-500">Welcome to venditor</div>
          <form onSubmit={handleSubmit} className="my-5 flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              <label className="font-bold">Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-red-200"
              />
            </div>
            <button
              type="submit"
              className="bg-red-200 rounded-md py-2 px-3 font-bold hover:bg-red-200/85"
            >
              Login
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </div>
        <div className="flex-grow relative">
          <Image
            src={pinkBeenies}
            alt="Picture of the author"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
