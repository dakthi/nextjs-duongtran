import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/lieu-barbican.jpg";

const imageStyle = {
  borderRadius: '2%',
  border: '1px solid #fff',
};

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap items-center">
        <div className="order-last xl:order-first flex items-start w-full lg:w-1/2 pl-5 pr-5 xl:pl-0 xl:pr-0">
          <div className="max-w-xl">
            <h1 className="text-lg font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              I am an accountant.
              <br/>
              How about you?
            </h1>
            <p className=" text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 xl:pr-0">
              I would love you hear more about <em>you</em>, and how I can help you protect your business, support your family, and enjoy the life you are building.
            </p>
            <p className="mb-2   text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 pr-5 xl:pr-0">
              Leave the <em>boring</em> parts to me
              <br /> You take care of what is <em>fun</em>!
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="/services"
                rel="noopener"
                className="mt-2 px-8 py-4 text-sm font-medium text-center text-white bg-gray-600 rounded-md"
              >
                See how I can help
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full p-5 xl:p-0 lg:w-1/2">
        <div className="relative w-full h-[550px] overflow-hidden rounded-lg border border-white">
          <Image
            src={heroImg}
            alt="Lieu Vo"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
            placeholder="blur"
            quality={100}
          />
        </div>
        </div>
      </Container>
    </>
  );
}
