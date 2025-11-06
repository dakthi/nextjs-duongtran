import Image from "next/image";
import { Container } from "@/components/Container";
import { getHeroData } from "@/lib/hero-service";
import { legacyMediaUrl, isMediaRemoteUrl } from "@/lib/media/media-client";
import { useLocale } from 'next-intl';

export const Hero = async ({ params }: { params?: { locale?: string } }) => {
  const locale = params?.locale || 'en';
  const heroContent = await getHeroData(locale);

  // Fallback to default content if no CMS content found
  const title = heroContent?.title || "I am an accountant.\nHow about you?";
  const subtitle = heroContent?.subtitle || "I would love you hear more about you, and how I can help you protect your business, support your family, and enjoy the life you are building.";
  const description = heroContent?.description || "Leave the boring parts to me\nYou take care of what is fun!";
  const ctaText = heroContent?.ctaText || "See how I can help";
  const ctaLink = heroContent?.ctaLink || "/services";
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-slate-800 mb-6">
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
