import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog — Damian",
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <div className="max-w-[760px] mx-auto px-7 py-16">
      <h1 className="font-display font-medium text-2xl mb-10">Blog</h1>
      <div className="flex flex-col">
        {posts.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`block py-7 ${i !== 0 ? "border-t border-border" : ""}`}
          >
            <div className="font-mono text-xs text-accent-dim mb-2">
              No. {String(posts.length - i).padStart(3, "0")}
            </div>
            <h2 className="font-display font-medium text-xl">
              {post.title}
            </h2>
            <p className="mt-2 text-secondary text-[15px] max-w-[560px]">
              {post.excerpt}
            </p>
            <div className="mt-3 font-mono text-xs text-secondary">
              {post.date} &nbsp;·&nbsp; {post.readingTime} &nbsp;·&nbsp;{" "}
              {post.tag}
            </div>
          </a>
        ))}
        {posts.length === 0 && (
          <p className="text-secondary">
            No entries yet — add a markdown file to content/blog.
          </p>
        )}
      </div>
    </div>
  );
}
