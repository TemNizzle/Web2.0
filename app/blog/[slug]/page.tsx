import { getPostBySlug, getAllPostsMeta } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-[680px] mx-auto px-7 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-accent-dim mb-4">
        {post!.tag}
      </div>
      <h1 className="font-display font-medium text-3xl leading-tight">
        {post!.title}
      </h1>
      <div className="mt-4 font-mono text-xs text-secondary">
        {post!.date} &nbsp;·&nbsp; {post!.readingTime}
      </div>
      <div
        className="prose-custom mt-10 text-[17px] leading-[1.75] text-primary"
        dangerouslySetInnerHTML={{ __html: post!.contentHtml }}
      />
    </article>
  );
}
