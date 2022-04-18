import React, { useEffect } from "react";
import "./marketInfo.css";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import MarketCard from "./marketCard";
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
  // can also show last updated date?
  console.log(trendingData.coins);

  const cardObjects = {
    globalmktcap: {
      title: "Global Market Cap",
      value: data?.data.total_market_cap?.usd,
      change: data?.data.market_cap_change_percentage_24h_usd,
    },
    globalvolume: {
      title: "Global 24h Volume",
      value: data?.data.total_volume?.usd,
    },
    btcDominance: {
      title: "BTC Dominance",
      value: data?.data.market_cap_percentage?.btc,
    },
    ethDominance: {
      title: "ETH Dominance",
      value: data?.data.market_cap_percentage?.eth,
    },
    trending: {
      title: "Trending",
      value: trendingData.coins[0].item.name,
      value2: trendingData.coins[1].item.name,
      value3: trendingData.coins[2].item.name,
    },
  };
  return (
    <div className="market-info">
      {data &&
        Object.entries(cardObjects).map((card) => (
          <MarketCard card={card} key={card[1].title} />
        ))}
    </div>
  );
}
