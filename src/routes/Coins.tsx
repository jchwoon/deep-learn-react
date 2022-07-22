import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoin } from "../api";
import { useQuery } from "react-query";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const CoinBox = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
`;
const CoinLs = styled.li`
  display: flex;
  padding-left: 10px;
  align-items: center;
  width: 370px;
  height: 60px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.textColor};
  transition: background-color 0.1s ease-in;
  a {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    color: ${(props) => props.theme.bgColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    a {
      display: block;
      color: white;
    }
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
}

export default function Coins() {
  const { data, isLoading } = useQuery<ICoin[]>("coins", fetchCoin);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinBox>
        {isLoading
          ? "Loading..."
          : data?.slice(0, 100).map((coin) => (
              <CoinLs key={coin.id}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                <Link to={coin.id} state={{ name: coin.name }}>
                  {coin.name} &rarr;
                </Link>
              </CoinLs>
            ))}
      </CoinBox>
    </Container>
  );
}
