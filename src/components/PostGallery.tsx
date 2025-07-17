// components/PostGallery.tsx

import Image from "next/image";

const fallbackImg = "/img/Portrait_Placeholder.png";

const imageStyle = {
  borderRadius: "2%",
  border: "1px solid #fff",
};

interface Post {
  slug: string;
  title: string;
  image?: string;
  quote?: string;
  category?: string;
  readingTime?: string;
}

interface PostGalleryProps {
  featuredPost: Post;
  topPosts: Post[];
  chunkedPosts: Post[][];
  headings?: string[];
}

export function PostGallery({
  featuredPost,
  topPosts,
  chunkedPosts,
  headings = [],
}: PostGalleryProps) {
  return (
    <>
      {/* Featured + Top 5 */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5 px-3">
        {/* Featured Post */}
        <a
          href={`/blog/${featuredPost.slug}`}
          className="group xl:col-span-2 hover:shadow-md transition-shadow rounded-xl overflow-hidden bg-white border"
        >
          <div className="relative w-full h-80 bg-white">
            <Image
              src={featuredPost.image || fallbackImg}
              alt={featuredPost.title}
              fill
              style={imageStyle}
              className="object-cover object-top"
              placeholder={featuredPost.image ? undefined : "blur"}
              quality={90}
            />
          </div>
          <div className="p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-gray-600">
              {featuredPost.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-x-3">
              {featuredPost.category && (
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {featuredPost.category}
                </span>
              )}
              {featuredPost.readingTime && <span>{featuredPost.readingTime} min read</span>}
            </div>
            {featuredPost.quote && (
              <p className="mt-2 text-gray-500 italic text-sm">“{featuredPost.quote}”</p>
            )}
          </div>
        </a>

        {/* Top 5 Vertical Stack */}
        <div className="flex flex-col gap-4">
          {topPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-4 border-b pb-3 hover:bg-gray-50 transition rounded-md"
            >
              <div className="relative w-16 h-16 rounded overflow-hidden">
                <Image
                  src={post.image || fallbackImg}
                  alt={post.title}
                  fill
                  className="object-cover"
                  placeholder={post.image ? undefined : "blur"}
                  quality={80}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800 group-hover:text-gray-600">
                  {post.title}
                </h4>
                <div className="mt-1 flex items-center text-xs text-gray-500 gap-x-2">
                  {post.category && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                      {post.category}
                    </span>
                  )}
                  {post.readingTime && <span>{post.readingTime} min</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Chunked Grid Sections */}
      {chunkedPosts.map((chunk, index) => (
        <div key={index}>
          <h3 className="mt-14 mb-5 text-xl md:text-2xl font-semibold text-gray-800 px-3">
            {headings[index] || "More reads"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-3">
            {chunk.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group hover:shadow-md transition-shadow rounded-xl overflow-hidden bg-white border"
              >
                <div className="relative w-full h-56 md:h-64">
                  <Image
                    src={post.image || fallbackImg}
                    alt={post.title}
                    fill
                    style={imageStyle}
                    className="object-cover"
                    placeholder={post.image ? undefined : "blur"}
                    quality={90}
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 gap-x-2">
                    {post.category && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                        {post.category}
                      </span>
                    )}
                    {post.readingTime && <span>{post.readingTime} min</span>}
                  </div>
                  {post.quote && (
                    <p className="mt-2 text-gray-500 italic text-xs">“{post.quote}”</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
