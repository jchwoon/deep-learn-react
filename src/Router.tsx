import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinID" element={<Coin />}>
          <Route path="/:coinID/price" element={<Price />}></Route>
          <Route path="/:coinID/chart" element={<Chart />}></Route>
        </Route>
        <Route path="/" element={<Coins />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
