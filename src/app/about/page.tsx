import { Container } from "@/components/Container";
import { AboutTitle } from "@/components/AboutTitle";
import { AboutBody } from "@/components/AboutBody";
import { FaqPage } from "@/components/Faq2";
import { PostGallery } from "@/components/PostGallery";
import { getPostSlugs, getPostBySlug } from "@/lib/post";
import { Faq } from "@/components/Faq";

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default async function Home() {
  const slugs = getPostSlugs();
  const rawPosts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Normalize readingTime to string
  const posts = rawPosts.map((post) => ({
    ...post,
    readingTime: post.readingTime !== undefined ? String(post.readingTime) : undefined,
  }));

  const [featuredPost, ...rest] = posts;
  const top5Posts = rest.slice(0, 5);
  const chunked = chunkArray(rest.slice(5), 6);
  const headings = ["Recent insights", "More articles", "Further reflections", "Latest updates", "New reads"];

  return (
    <Container>
      {/* Intro Section: Image + Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src="/img/lieu/lieu-1.jpeg"
            alt="About Lieu"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <AboutTitle />
          <AboutBody />
        </div>
      </div>

      {/* Blog Section */}
      <div className="mt-16">
        <PostGallery
          featuredPost={featuredPost}
          topPosts={top5Posts}
          chunkedPosts={chunked}
          headings={headings}
        />
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
      <Faq />
      </div>
    </Container>
  );
}
