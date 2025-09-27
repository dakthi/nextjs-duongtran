import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import { testimonials } from "./testimonialsData";

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="lg:col-span-2 xl:col-auto pl-5 pr-5 xl:p-0"
          >
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
              <p className="text-2xl leading-normal">
                &ldquo;{testimonial.body[0]}&rdquo;
              </p>

              <Avatar
                image={testimonial.image}
                name={testimonial.name}
                role={testimonial.role}
                date={testimonial.date}
                relationship={testimonial.relationship}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: string;
  name: string;
  role: string;
  date: string;
  relationship: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="items-center overflow-hidden object-cover rounded-full w-14 h-14 shadow-sm shadow-black">
        <Image src={props.image} width={56} height={56} alt={props.name} />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600">{props.role}</div>
        <div className="text-gray-500 text-sm">
          {props.date} · {props.relationship}
        </div>
      </div>
    </div>
  );
}
