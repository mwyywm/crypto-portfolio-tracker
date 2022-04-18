import React from "react";
import "./marketInfo.css";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import MarketCard from "./MarketCard";
import ScrollContainer from "react-indiana-drag-scroll";

const formatBigNum = Intl.NumberFormat("en", { notation: "compact" });

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
  // if (!data && !trendingData) return <div>loading...</div>;
  // can also show last updated date?

  const cardObjects = {
    globalmktcap: {
      title: "Global Market Cap",
      value: formatBigNum.format(data?.data.total_market_cap?.usd),
      change: data?.data.market_cap_change_percentage_24h_usd?.toFixed(2) + "%",
    },
    globalvolume: {
      title: "Global Volume (24h)",
      value: formatBigNum.format(data?.data.total_volume?.usd),
    },
    btcDominance: {
      title: "BTC Dominance",
      value: data?.data.market_cap_percentage?.btc?.toFixed(2) + "%",
    },
    ethDominance: {
      title: "ETH Dominance",
      value: data?.data.market_cap_percentage?.eth?.toFixed(2) + "%",
    },
    trending: {
      title: "Trending",
      first: {
        value: trendingData?.coins[0].item.name,
        valueImg: trendingData?.coins[0].item.thumb,
        slug: trendingData?.coins[0].item.slug,
      },
      second: {
        value2: trendingData?.coins[1].item.name,
        valueImg2: trendingData?.coins[1].item.thumb,
        slug: trendingData?.coins[1].item.slug,
      },
      third: {
        value3: trendingData?.coins[2].item.name,
        valueImg3: trendingData?.coins[2].item.thumb,
        slug: trendingData?.coins[2].item.slug,
      },
    },
  };
  return (
    <ScrollContainer
      className="market-info"
      vertical={false}
      hideScrollbars={false}
    >
      {data &&
        Object.entries(cardObjects).map((card) => (
          <MarketCard card={card} key={card[1].title} />
        ))}
    </ScrollContainer>
  );
}
