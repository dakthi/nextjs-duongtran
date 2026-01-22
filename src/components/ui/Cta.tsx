import React from "react";
import { Container } from "@/components/layout/Container";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full gap-5 text-white bg-accent px-8 py-10 lg:flex-nowrap rounded-2xl shadow-soft">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-serif font-bold lg:text-3xl">
            Ready to start your journey?
          </h2>
          <p className="mt-2 text-white/90 lg:text-lg">
            Let&apos;s work together to unlock your potential.
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="/contact"
            className="inline-block py-3 mx-auto text-base font-semibold text-center text-accent bg-white rounded-full px-8 lg:px-10 lg:py-4 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
          >
            Get in touch
          </a>
        </div>
      </div>
    </Container>
  );
};
