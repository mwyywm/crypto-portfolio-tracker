import React from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import "./Coin.css";
import { AiOutlineRight } from "react-icons/ai";
import CoinConverter from "../components/CoinConverter";

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
  return (
    <section className="coinsection">
      <div className="breadcrumb">
        <p className="breadcrumb-text">
          <Link to="/" className="breadcrumb-coins">
            Coins
          </Link>{" "}
          <AiOutlineRight /> {data ? data?.name : "..."}
        </p>
      </div>
      {data && (
        <div className="coin">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <img
                src={data.image.small}
                alt={data.name}
                width={32}
                height={32}
              />
              <h1 className="coin-title">{data.name}</h1>
              <p className="symbol">{data.symbol?.toUpperCase()}</p>
            </div>
            <div className="coininfo">
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
        </div>
      )}
    </section>
  );
}

export default Coin;
