import React from "react";
import { useMediaQuery } from "react-responsive";

export default function MediaQuery({ children, desktop, mobile }) {
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {desktop && isDesktop && <>{children}</>}
      {mobile && isMobile && <>{children}</>}
    </>
  );
}
