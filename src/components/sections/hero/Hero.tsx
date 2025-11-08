import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getHeroData } from "@/lib/hero-service";
import { legacyMediaUrl, isMediaRemoteUrl } from "@/lib/media/media-client";
import { useLocale } from 'next-intl';

export const Hero = async ({ params }: { params?: { locale?: string } }) => {
  const locale = params?.locale || 'en';
  const heroContent = await getHeroData(locale);

  // Fallback to default content if no CMS content found
  const title = heroContent?.title || "SMEs owners and independent professionals";
  const subtitle = heroContent?.subtitle || "can make sense and be on top of their tax";
  const description = heroContent?.description || "Access the benefits and reliefs you're entitled to, and keep more of what you work hard for.";
  const ctaText = heroContent?.ctaText || "Get in touch";
  const ctaLinkRaw = heroContent?.ctaLink || "/contact";

  // Add locale prefix to relative paths (not external URLs or anchors)
  const ctaLink = ctaLinkRaw.startsWith('/') && !ctaLinkRaw.startsWith('//')
    ? `/${locale}${ctaLinkRaw}`
    : ctaLinkRaw;

  const image = heroContent?.image || null;
  const fallbackImage = legacyMediaUrl('/img/lieu-barbican.jpg');
  const heroImage = image || fallbackImage;
  const isRemote = isMediaRemoteUrl(heroImage);

  // Image control settings
  const imagePosition = heroContent?.imagePosition || 'center 70%';
  const imageZoom = heroContent?.imageZoom || 100;
  const imageFit = (heroContent?.imageFit as 'cover' | 'contain' | 'fill') || 'cover';

  return (
    <div className="bg-amber-50 py-20 border-b-4 border-amber-500">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-slate-800 mb-6">
              {title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            {subtitle && (
              <p className="text-lg leading-relaxed text-slate-700 mb-4">
                {subtitle.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.split(/(<em>.*?<\/em>)/g).map((part, partIndex) => {
                      if (part.startsWith('<em>') && part.endsWith('</em>')) {
                        return <em key={partIndex} className="text-amber-600 font-semibold">{part.slice(4, -5)}</em>;
                      }
                      return part;
                    })}
                    {index < subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
            {description && (
              <p className="text-base leading-relaxed text-slate-600 mb-8">
                {description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.split(/(<em>.*?<\/em>)/g).map((part, partIndex) => {
                      if (part.startsWith('<em>') && part.endsWith('</em>')) {
                        return <em key={partIndex} className="text-amber-600 font-semibold">{part.slice(4, -5)}</em>;
                      }
                      return part;
                    })}
                    {index < description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}

            <div>
              <a
                href={ctaLink}
                rel="noopener"
                className="inline-block px-8 py-3 text-base font-semibold text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors"
              >
                {ctaText}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full overflow-hidden border-4 border-slate-800">
              <Image
                src={heroImage}
                alt="Lieu Vo"
                width={800}
                height={800}
                style={{
                  width: '100%',
                  height: 'auto',
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
