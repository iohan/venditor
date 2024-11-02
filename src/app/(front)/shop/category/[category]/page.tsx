"use client";

import Hero from "@/app/(front)/_components/Hero";
import Link from "next/link";
import heroOne from "@/images/hero-one.webp";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function Category({ params }: { params: { category: string } }) {
  const [products] = useState<Product[]>([]);

  /*const { data, isLoading, isError } = useLoad<Product[], { id: number }>({
    url: "http://localhost:3000/api/products",
  });*/

  /*useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;*/

  return (
    <>
      <Hero image={heroOne} />
      <div className="container">
        Category page: {params.category}. Product:{" "}
        {Array.isArray(products) &&
          products.map((product) => {
            return (
              <Link key={product.id} href={`/shop/product/test-slug`}>
                {product.title}
              </Link>
            );
          })}
      </div>
    </>
  );
}
