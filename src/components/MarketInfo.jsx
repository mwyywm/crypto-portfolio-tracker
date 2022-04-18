import React, { useEffect } from "react";
import "./marketInfo.css";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
// https://api.coingecko.com/api/v3/search/trending
// https://api.coingecko.com/api/v3/global
// we need to fetch from the two API endpoints and then display the data.

export default function MarketInfo() {
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/global",
    fetcher
  );
  const { data: trendingData, error: trendingError } = useSWR(
    "https://api.coingecko.com/api/v3/search/trending",
    fetcher
  );
  if (error || trendingError) return <div>failed to load</div>;
  if (!data && !trendingData) return <div>loading...</div>;
  // market_cap_change_percentage_24h_usd, market_cap_percentage.btc, market_cap_percentage.eth, total_market_cap.usd, total_volume.usd
  //
  // can also show last updated date?
  // console.log(data.data.total_market_cap?.usd);

  const cardObjects = {
    globalmktcap: {
      title: "Global Market Cap",
      value: data.data.total_market_cap?.usd,
    },
    globalvolume: {
      title: "Global 24h Volume",
      value: data.data.total_volume?.usd,
    },
    btcDominance: {
      title: "BTC Dominance",
      value: data.data.market_cap_percentage?.btc,
    },
    ethDominance: {
      title: "ETH Dominance",
      value: data.data.market_cap_percentage?.eth,
    },
  };
  console.log(cardObjects);
  return (
    <div className="market-info">
      <div className="market-card">
        <p className="market-card-title">Global market cap</p>
        <div className="market-card-text">
          <p>13</p>
          <p>242</p>
        </div>
      </div>
    </div>
  );
}
