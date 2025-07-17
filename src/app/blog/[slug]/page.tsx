import { getPostBySlug, getPostSlugs } from '@/lib/post';
import { notFound } from 'next/navigation';
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Hero } from "@/components/Hero";
import Image from 'next/image';

type Params = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default async function CasePage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  console.log("Fetched post:", post);

  if (!post) return notFound();

  return (
    <div>
      <Container>
        {/* Breadcrumbs */}
        <div className="flex items-center justify-start gap-4 text-sm text-gray-500 px-5 mt-5 xl:ml-16">
          <a href="/cases" className="hover:underline font-semibold text-gray-600 whitespace-nowrap">
            ← All case studies
          </a>
          <span className="text-gray-300">|</span>
          {post.category && (
            <>
              <span className="whitespace-nowrap">{post.category}</span>
              <span className="text-gray-300">|</span>
            </>
          )}
          {post.date && (
            <>
              <span className="whitespace-nowrap">{new Date(post.date).getFullYear()}</span>
              <span className="text-gray-300">|</span>
            </>
          )}
          {post.readingTime && (
            <span className="whitespace-nowrap">{post.readingTime} min read</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl xl:text-5xl font-bold text-gray-900 mt-5 ml-5 xl:ml-20 mr-10 xl:mr-20">
          {post.title}
        </h1>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">

            {/* Quote */}
            {post.quote && (
              <blockquote className="md:col-span-2 border-l-4 border-gray-900 pl-4 italic text-lg xl:text-xl text-gray-800">
                <span className="text-4xl text-gray-900 mr-2">“</span>
                {post.quote}
              </blockquote>
            )}

            {/* Client Info */}
            {post.client && (
              <div className="flex items-center gap-4 pl-3">
                <Image
                  src={post.client.image}
                  alt={post.client.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.client.name} {post.client.age && `(${post.client.age})`}
                  </p>
                  <p className="text-gray-600">{post.client.job}</p>
                </div>
              </div>
            )}

            {/* Expert Info */}
            {post.expert && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <p>This case was shared by:</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.expert.image}
                    alt={post.expert.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{post.expert.name}</p>
                    <p className="text-gray-500 text-xs">{post.expert.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Markdown Content */}
          <Container>
            <article
              className="prose prose-lg max-w-none space-y-6 pl-5 pr-2 xl:pr-44 xl:text-xl text-left text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Closing Invitation */}
            <div className="xl:pl-10 my-12 py-6 pr-2 bg-gray-100 rounded-xl xl:w-5/6 w-full">
              <SectionTitle
                preTitle="let's connect"
                title="How can I help you?"
                align="left"
              >
                Every case study, every project, and every improvement shared here reflects a simple belief: thoughtful numbers make powerful changes.  
                <br /><br />
                If you would like to work with someone who cares about the financial side of your business — and the people behind it — I would love to hear your story.
                <br /><br />
                Let&apos;s discuss how I can support you.
              </SectionTitle>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}
