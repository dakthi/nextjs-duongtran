import Image from "next/image";
import React from "react";
import { Container }  from "@/components/Container";
import { SectionTitle } from "./SectionTitle";
import { isMediaRemoteUrl } from "@/lib/media/media-client";

interface BenefitsProps {
  imgPos?: "left" | "right";
  size?: "small" | "medium" | "large";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}
export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;
  return (
      <Container className="flex flex-col">
        <h3 className="text-3xl md:text-4xl font-sans font-bold leading-tight text-outer-space mb-4 text-center">
          {data.title}
        </h3>

        <p className="text-lg leading-relaxed text-feldgrau mb-12 text-center max-w-4xl mx-auto">
          {data.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.bullets.map((item, index) => (
            <Benefit key={index} title={item.title} icon={item.icon}>
              {item.desc}
            </Benefit>
          ))}
        </div>
      </Container>
  );
};

function Benefit(props: any) {
  return (
      <div className="bg-white p-6 border-l-4 border-jungle-green border-2 border-outer-space shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
        <h4 className="text-lg font-bold text-outer-space mb-3">
          {props.title}
        </h4>
        <p className="text-base leading-relaxed text-feldgrau">
          {props.children}
        </p>
      </div>
  );
}
