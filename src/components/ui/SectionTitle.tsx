import React from "react";
import { Container } from "@/components/layout/Container";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
  return (
    <Container
      className={`flex w-full flex-col ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}>
      {props.preTitle && (
        <div className="text-xs font-semibold tracking-widest mb-3 letter-spacing-wider text-feldgrau">
          {props.preTitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-3xl text-3xl md:text-4xl font-sans font-bold leading-tight mb-6 text-outer-space">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-3xl text-lg leading-relaxed text-outer-space font-medium">
          {props.children}
        </p>
      )}
    </Container>
  );
}

