import Image from "next/image";
import React from "react";
import { Container }  from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
        <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-slate-900 mb-4 text-center">
          {data.title}
        </h3>

        <p className="text-lg leading-relaxed text-slate-800 mb-12 text-center max-w-4xl mx-auto">
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
      <div className="bg-white p-6 border-l-4 border-amber-500 shadow-md">
        <h4 className="text-lg font-bold text-slate-900 mb-3">
          {props.title}
        </h4>
        <p className="text-base leading-relaxed text-slate-700">
          {props.children}
        </p>
      </div>
  );
}
