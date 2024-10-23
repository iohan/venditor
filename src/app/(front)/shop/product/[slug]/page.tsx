export default function Product({ params }: { params: { slug: string } }) {
  return <>Product: {params.slug}</>;
}
