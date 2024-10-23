"use client";

import Hero from "@/app/(front)/_components/Hero";
import { Product } from "@/app/api/products/types";
import useLoad from "@/hooks/useLoad";
import Link from "next/link";
import heroOne from "@/images/hero-one.webp";

export default function Category({ params }: { params: { category: string } }) {
  const {
    data: products,
    loading,
    error,
  } = useLoad<Product[], { id: number }>({
    url: "http://localhost:3000/api/products",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Hero image={heroOne} />
      <div className="container">
        Category page: {params.category}. Product:{" "}
        {products?.map((product) => {
          return (
            <Link key={product.id} href={`/shop/product/${product.slug}`}>
              {product.title}
            </Link>
          );
        })}
      </div>
    </>
  );
}
