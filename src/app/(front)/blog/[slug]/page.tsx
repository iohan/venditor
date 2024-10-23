export default function BlogPost({ params }: { params: { slug: string } }) {
  return <>Blogpost {params.slug}</>;
}
