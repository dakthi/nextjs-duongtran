  import React from "react";

  interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }

  export function Container(props: Readonly<ContainerProps>) {
    return (
      <div
        className={`container max-w-5xl mx-auto px-1.5 sm:px-2 md:px-3 lg:px-4 xl:px-6 ${
          props.className ? props.className : ""
        }`}>
        {props.children}
      </div>
    );
  }

