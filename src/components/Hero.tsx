import Image from "next/image";
import { Container } from "@/components/Container";
import { getHeroData } from "@/lib/hero-service";
import { legacyMediaUrl, isMediaRemoteUrl } from "@/lib/media/media-client";
import { useLocale } from 'next-intl';

export const Hero = async ({ params }: { params?: { locale?: string } }) => {
  const locale = params?.locale || 'en';
  const heroContent = await getHeroData(locale);

  // Fallback to default content if no CMS content found
  const title = heroContent?.title || "Your Journey to Success Starts Here";
  const subtitle = heroContent?.subtitle || "Life Coach & Student Mentor";
  const description = heroContent?.description || "Helping students achieve their dreams through personalized guidance on university applications, scholarships, and career development.";
  const ctaText = heroContent?.ctaText || "Start Your Journey";
  const ctaLinkRaw = heroContent?.ctaLink || "/contact";

  // Add locale prefix to relative paths (not external URLs or anchors)
  const ctaLink = ctaLinkRaw.startsWith('/') && !ctaLinkRaw.startsWith('//')
    ? `/${locale}${ctaLinkRaw}`
    : ctaLinkRaw;

  const image = heroContent?.image || null;
  const fallbackImage = legacyMediaUrl('/img/duong-tran-hero.jpg');
  const heroImage = image || fallbackImage;
  const isRemote = isMediaRemoteUrl(heroImage);

  // Image control settings
  const imagePosition = heroContent?.imagePosition || 'center 70%';
  const imageZoom = heroContent?.imageZoom || 100;
  const imageFit = (heroContent?.imageFit as 'cover' | 'contain' | 'fill') || 'cover';

  return (
    <div className="bg-card py-20 md:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="flex-1 max-w-xl">
            <p className="text-sm font-medium tracking-widest text-accent-2 uppercase mb-4">
              {subtitle || "Life coach & student mentor"}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-fg mb-6">
              {title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            {description && (
              <p className="text-lg leading-relaxed text-muted mb-10">
                {description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.split(/(<em>.*?<\/em>)/g).map((part, partIndex) => {
                      if (part.startsWith('<em>') && part.endsWith('</em>')) {
                        return <em key={partIndex} className="text-accent font-medium not-italic">{part.slice(4, -5)}</em>;
                      }
                      return part;
                    })}
                    {index < description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ctaLink}
                rel="noopener"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-accent hover:bg-accent/90 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                {ctaText}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={heroImage}
                alt="Duong Tran - Life Coach & Student Mentor"
                width={800}
                height={800}
                priority
                className="w-full h-auto"
                style={{
                  objectFit: imageFit,
                  objectPosition: imagePosition,
                  transform: `scale(${imageZoom / 100})`,
                  transformOrigin: imagePosition
                }}
                quality={100}
                unoptimized={isRemote}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
