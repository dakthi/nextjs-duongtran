import { Container } from "@/components/Container";

export function VideoSelfHosted() {
  return (
    <Container className="pr-5 pl-5">
      <div className="relative w-full xl:h-screen mx-auto overflow-hidden lg:mb-20 rounded">
      <video
        src="/img/lieu-podcast.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-md"
    >
          Sorry, your browser doesn’t support embedded videos.
        </video>
      </div>
    </Container>
  );
}
