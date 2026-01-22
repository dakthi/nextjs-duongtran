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
        <div className="text-sm font-medium tracking-widest uppercase mb-4 text-accent-2">
          {props.preTitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-3xl text-3xl md:text-4xl font-serif font-bold leading-tight mb-6 text-fg">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          {props.children}
        </p>
      )}
    </Container>
  );
}

