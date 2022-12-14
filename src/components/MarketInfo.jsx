import React from "react";
import MrktCard from "./MrktCard";
import "./marketInfo.css";
import useSWR from "swr";
import ScrollContainer from "react-indiana-drag-scroll";
import Skeleton from "./Skeleton";

const formatBigNum = Intl.NumberFormat("en", { notation: "compact" });

export default function MarketInfo() {
  const { data, error, isValidating } = useSWR(
    "https://api.coingecko.com/api/v3/global",
    {
      revalidateOnFocus: false,
    }
  );
  const { data: trendingData, error: trendingError } = useSWR(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      revalidateOnFocus: false,
    }
  );

  if (!data || isValidating)
    return (
      <div className="market-info">
        <Skeleton height={"130px"} />
        <Skeleton height={"130px"} />
        <Skeleton height={"130px"} />
        <Skeleton height={"130px"} />
        <Skeleton height={"130px"} />
      </div>
    );
  if (error || trendingError) return <div>failed to load</div>;

  const cardObjects = {
    globalmktcap: {
      title: "Global Market Cap",
      type: "global",
      value: formatBigNum.format(data?.data.total_market_cap?.usd),
      change: data?.data.market_cap_change_percentage_24h_usd?.toFixed(2) + "%",
    },
    globalvolume: {
      title: "Global Volume (24h)",
      type: "global",
      value: formatBigNum.format(data?.data.total_volume?.usd),
    },
    btcDominance: {
      title: "BTC Dominance",
      type: "dominance",
      value: data?.data.market_cap_percentage?.btc?.toFixed(2) + "%",
    },
    ethDominance: {
      title: "ETH Dominance",
      type: "dominance",
      value: data?.data.market_cap_percentage?.eth?.toFixed(2) + "%",
    },
    trending: {
      title: "Trending",
      type: "trending",
      first: {
        value: trendingData?.coins[0].item.name,
        valueImg: trendingData?.coins[0].item.thumb,
        slug: trendingData?.coins[0].item.id,
      },
      second: {
        value2: trendingData?.coins[1].item.name,
        valueImg2: trendingData?.coins[1].item.thumb,
        slug: trendingData?.coins[1].item.id,
      },
      third: {
        value3: trendingData?.coins[2].item.name,
        valueImg3: trendingData?.coins[2].item.thumb,
        slug: trendingData?.coins[2].item.id,
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
          <MrktCard card={card} key={card[1].title} />
        ))}
    </ScrollContainer>
  );
}
