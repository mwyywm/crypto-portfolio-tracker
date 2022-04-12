import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import "./Coin.css";
import CoinConverter from "../components/CoinConverter";
import Breadcrumb from "../components/Breadcrumb";

function Coin() {
  let params = useParams();
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${params.coin}`,
    fetcher
  );

  {
    !data && (
      <section className="coinsection">
        <div style={{ textAlign: "center" }}>
          <p>loading...</p>
        </div>
      </section>
    );
  }
  {
    error && (
      <section className="coinsection">
        <div style={{ textAlign: "center" }}>
          <p>Failed to load, you are being rate limited.</p>
        </div>
      </section>
    );
  }
  console.log("data", data);
  return (
    <section className="coinsection">
      <Breadcrumb text={data?.name} />
      {data && (
        <div className="coin">
          <div className="coin-heading">
            <img
              src={data.image.small}
              alt={data.name}
              width={40}
              height={40}
            />
            <h1 className="coin-text">{data.name}</h1>
            <p className="symbol">{data.symbol?.toUpperCase()}</p>
          </div>
          <div className="noclassyet">
            {/* 
            TODO: wrap the paragraphs in <span>  &
            only render if there is a value
            */}
            <p>Market cap rank: #{data.market_cap_rank}</p>
            <p>
              Market cap:{" "}
              {new Intl.NumberFormat("en-US").format(
                data.market_data.market_cap.usd
              )}
            </p>
            <p>
              Circulating supply:{" "}
              {new Intl.NumberFormat("en-US").format(
                data.market_data.circulating_supply
              )}
            </p>
            <p>
              Total supply:{" "}
              {new Intl.NumberFormat("en-US").format(
                data.market_data.total_supply
              )}
            </p>
          </div>
          <div className="coin-info">
            {data.market_data && (
              <>
                <p>
                  {data.symbol?.toUpperCase()} price:{" "}
                  <span className="price">
                    ${data.market_data.current_price.usd}{" "}
                    <span
                      style={{
                        color:
                          data.market_data.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
                        fontSize: "24px",
                      }}
                    >
                      {`${data.market_data.price_change_percentage_24h?.toFixed(
                        2
                      )}%`}
                    </span>
                  </span>
                </p>
              </>
            )}
          </div>
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
