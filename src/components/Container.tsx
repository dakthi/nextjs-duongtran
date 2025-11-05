  import React from "react";

  interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }

  export function Container(props: Readonly<ContainerProps>) {
    return (
      <div
        className={`container max-w-5xl mx-auto px-8 xl:px-12 ${
          props.className ? props.className : ""
        }`}>
        {props.children}
      </div>
    );
  }

