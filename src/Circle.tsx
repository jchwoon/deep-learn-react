import styled from "styled-components";

interface ICircle {
  bgColor: string;
}

interface IContainer {
  Color: string;
}

const Container = styled.div<IContainer>`
  background-color: ${(props) => props.Color};
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

export default function Circle({ bgColor }: ICircle) {
  return <Container Color={bgColor} />;
}
