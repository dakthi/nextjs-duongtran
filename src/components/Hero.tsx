import Image from "next/image";
import { Container } from "@/components/Container";
import { getHeroData } from "@/lib/hero-service";
import { legacyMediaUrl, isMediaRemoteUrl } from "@/lib/media/media-client";

export const Hero = async () => {
  const heroContent = await getHeroData();

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

  return (
    <>
      <Container className="flex flex-wrap items-center">
        <div className="order-last xl:order-first flex items-start w-full lg:w-1/2 pl-5 pr-5 xl:pl-0 xl:pr-0">
          <div className="max-w-xl">
            <h1 className="text-lg font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              {title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            {subtitle && (
              <p className="text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 xl:pr-0">
                {subtitle.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.split(/(<em>.*?<\/em>)/g).map((part, partIndex) => {
                      if (part.startsWith('<em>') && part.endsWith('</em>')) {
                        return <em key={partIndex}>{part.slice(4, -5)}</em>;
                      }
                      return part;
                    })}
                    {index < subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
            {description && (
              <p className="mb-2 text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 pr-5 xl:pr-0">
                {description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.split(/(<em>.*?<\/em>)/g).map((part, partIndex) => {
                      if (part.startsWith('<em>') && part.endsWith('</em>')) {
                        return <em key={partIndex}>{part.slice(4, -5)}</em>;
                      }
                      return part;
                    })}
                    {index < description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href={ctaLink}
                rel="noopener"
                className="mt-2 px-8 py-4 text-sm font-medium text-center text-white bg-gray-600 rounded-md"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full p-5 xl:p-0 lg:w-1/2">
          <div className="relative w-full h-[550px] overflow-hidden rounded-lg border border-white">
            <Image
              src={heroImage}
              alt="Lieu Vo"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
              quality={100}
              unoptimized={isRemote}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
