import styled from "styled-components";

const Letter = styled.span.attrs({
  className: "font-funky font-bold text-white"
})`
  background-clip: text;
  -webkit-background-clip: text;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.src});
  font-size: ${props => props.size};
  line-height: 0.5;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
`;

const AnimatedLetter = ({ children, size = "25vw", src }) => {
  return (
    <Letter size={size} src={src}>
      {children}
    </Letter>
  );
};

export default AnimatedLetter;
