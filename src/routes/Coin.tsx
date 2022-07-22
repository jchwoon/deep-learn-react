import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { coinInfoData, coinPriceData } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  a {
    color: white;
  }
`;
const Header = styled.header`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 40px;
  padding-left: 40px;
  width: 450px;
  height: 400px;
  border-radius: 100px;
  background-color: #353030;
`;
const DetailOne = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  background-color: black;
`;
const Symbol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  background-color: black;
`;
const OpenSource = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  background-color: black;
`;
const DetailTwo = styled.div`
  background-color: black;
  height: 100px;
  border-radius: 20px;
  padding: 10px 20px;
`;
const Description = styled.p``;
const DetailThird = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background-color: black;
`;
const Max = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background-color: black;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface IState {
  state: {
    name: string;
  };
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: string;
      th_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

(() => {})();
export default function Coin() {
  const { state } = useLocation() as IState;
  const { coinID } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinID],
    () => coinInfoData(String(coinID))
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceInfo>(
    ["price", coinID],
    () => coinPriceData(String(coinID))
  );
  const loading = infoLoading && priceLoading;
  return (
    <Container>
      <Link to={`/`}>home</Link>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loding..." : infoData?.name}
        </Title>
      </Header>
      <Detail>
        <DetailOne>
          <Rank>
            Rank
            <span>{infoData?.rank}</span>
          </Rank>
          <Symbol>
            Symbol
            <span>{infoData?.symbol}</span>
          </Symbol>
          <OpenSource>
            OpenSource
            <span>
              {loading ? "" : `${infoData?.open_source}`.toUpperCase()}
            </span>
          </OpenSource>
        </DetailOne>
        <DetailTwo>
          <Description>
            {Number(infoData?.description.length) > 200
              ? infoData?.description.slice(0, 200)
              : infoData?.description}
          </Description>
        </DetailTwo>
        <DetailThird>
          <Total>
            TotalSupply
            <span>{priceData?.total_supply}</span>
          </Total>
          <Max>
            MaxSupply
            <span>{priceData?.max_supply}</span>
          </Max>
        </DetailThird>
      </Detail>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinID}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinID}/price`}>Price</Link>
        </Tab>
      </Tabs>
      <Outlet context={coinID} />
    </Container>
  );
}
