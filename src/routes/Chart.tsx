import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IPriceData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

export default function Chart() {
  const coinID = useOutletContext();
  const { isLoading, data } = useQuery<IPriceData[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(String(coinID))
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: new Date(price.time_open),
                    y: [
                      price.close,
                      price.high,
                      price.low,
                      price.open,
                      price.volume,
                    ],
                  };
                }),
              },
            ] as any
          }
          type="candlestick"
          options={{
            tooltip: {
              x: {
                show: false,
              },
            },
            chart: {
              toolbar: {
                show: false,
              },
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}
