const basicUrl = "https://api.coinpaprika.com/v1";

export function fetchCoin() {
  return fetch(`${basicUrl}/coins`).then((response) => response.json());
}
export function coinInfoData(coinID: string) {
  return fetch(`${basicUrl}/coins/${coinID}`).then((response) =>
    response.json()
  );
}

export function coinPriceData(coinID: string) {
  return fetch(`${basicUrl}/tickers/${coinID}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinID: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinID}`
  ).then((response) => response.json());
}
