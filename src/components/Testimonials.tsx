import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import userOneImg from "../../public/img/user1.jpg";
import userTwoImg from "../../public/img/user2.jpg";
import userThreeImg from "../../public/img/user3.jpg";

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto pl-5 pr-5 xl:p-0">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal">
              &quot;Lieu&#39;s attention to detail and professionalism have made a huge difference to our financial operations. <Mark>Reliable and trustworthy</Mark> from day one.&quot;
            </p>

            <Avatar
              image={userOneImg}
              name="Rachel Pepper"
              title="Director, Small Business Client"
            />
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-auto pl-5 pr-5 xl:p-0">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal">
              &quot;It is rare to find someone as <Mark>meticulous and approachable</Mark> as Lieu. She makes accounting feel simple and manageable.&quot;
            </p>

            <Avatar
              image={userTwoImg}
              name="Anna Vu"
              title="Owner, Local Retail Business"
            />
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-auto pl-5 pr-5 xl:p-0">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal">
              &quot;Lieu&#39;s work is always <Mark>thorough, proactive, and insightful</Mark>. Highly recommended for any growing business.&quot;
            </p>

            <Avatar
              image={userThreeImg}
              name="Jonah Rees"
              title="Founder, Creative Agency"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: any;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="items-center overflow-hidden object-cover rounded-full w-14 h-14 shadow-sm shadow-black">
        <Image
          src={props.image}
          width="56"
          height="56"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-black bg-slate-300 rounded-sm ring-4 ring-slate-300">
        {props.children}
      </mark>{" "}
    </>
  );
}
