import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import "./Coin.css";
import CoinConverter from "../components/CoinConverter";
import Breadcrumb from "../components/Breadcrumb";
import formatNumber from "../utils/formatNumber";

function Coin() {
  let params = useParams();
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${params.coin}`
  );
  const title = document.title;

  useEffect(() => {
    document.title = data?.name ? `cpt - ${data.name}` : title;
  }, [data]);

  return (
    <section className="coinsection">
      <Breadcrumb text={data?.name ? data.name : ""} />
      {!data && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>loading...</p>
        </div>
      )}
      {data?.error && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>{params?.coin ? params.coin : "coin"} could not be found...</p>
        </div>
      )}
      {data?.name && (
        <div className="coin">
          <div className="coin-heading">
            <img
              src={data?.image?.small}
              alt={data.name}
              width={40}
              height={40}
            />
            <h1 className="coin-text">{data.name}</h1>
            <p className="symbol">{data.symbol?.toUpperCase()}</p>
          </div>
          <div className="coin-info-tabs">
            {data?.market_cap_rank && (
              <p className="coin-tabs">
                Market Cap rank: #{data.market_cap_rank}
              </p>
            )}
            {data?.market_data?.market_cap?.usd && (
              <p className="coin-tabs">
                Market Cap: ${formatNumber(data.market_data.market_cap?.usd)}
              </p>
            )}
            {data?.market_data && (
              <p className="coin-tabs">
                Circulating Supply:{" "}
                {formatNumber(data.market_data.circulating_supply)}{" "}
                {data?.symbol.toUpperCase()}
              </p>
            )}
            {data?.market_data?.total_supply > 0 && (
              <p className="coin-tabs">
                Total Supply: {formatNumber(data.market_data.total_supply)}{" "}
                {data.symbol?.toUpperCase()}
              </p>
            )}
          </div>
          {data.market_data && (
            <div className="coin-info">
              <div className="test">
                <p>
                  {data.symbol?.toUpperCase()} price: $
                  {data.market_data.current_price.usd}{" "}
                  <span
                    style={{
                      color:
                        data.market_data.price_change_percentage_24h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {typeof data.market_data.price_change_percentage_24h ===
                    "number" ? (
                      data.market_data.price_change_percentage_24h?.toFixed(2) +
                      "%"
                    ) : (
                      <span style={{ color: "black" }}>?</span>
                    )}
                  </span>
                </p>
              </div>
              <div className="test">
                <p>
                  All time high price: ${data.market_data?.ath?.usd}{" "}
                  <span
                    style={{
                      color:
                        data.market_data?.ath_change_percentage.usd > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {data.market_data.ath_change_percentage.usd?.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          )}
          {data.market_data && (
            <>
              <CoinConverter
                priceOfCoin={data.market_data.current_price.usd}
                symbol={data.symbol}
                coinImage={data.image.small}
              />
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Coin;
