import React from "react";
import { useMediaQuery } from "react-responsive";

export const BREAKPOINTS = {
  desktop: { query: "(min-width: 768px)" },
  mobile: { query: "(max-width: 767px)" }
};

export default function MediaQuery({ children, desktop, mobile }) {
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  return (
    <>
      {desktop && isDesktop && <>{children}</>}
      {mobile && isMobile && <>{children}</>}
    </>
  );
}
