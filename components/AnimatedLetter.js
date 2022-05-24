import styled from "styled-components";

const AnimatedLetter = ({ children, size = "24vh", src }) => {
  const Letter = styled.span.attrs({
    className: "font-serif font-bold text-white"
  })`
    background-clip: text;
    -webkit-background-clip: text;
    background-size: cover;
    background-position: center center;
    background-image: url(${src});
    font-size: ${size};
    line-height: 1;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
  `;

  return <Letter>{children}</Letter>;
};

export default AnimatedLetter;
