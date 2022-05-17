import React from 'react';

const CoinCard = ({ coin }) => {
  var perc = Math.floor(coin.perc * 100) / 100;
  var min = coin.min.toFixed(10);
  var max = coin.max.toFixed(10);

  return (
    <div className="border min-h-[100px] hover:shadow-md">
      {coin.symbol}
      <p>
        Buy from <b className="text-green-500">{coin.minExchange}</b> for {min}
      </p>
      <p>
        Sell at <b className="text-red-500">{coin.maxExchange}</b> for {max}
      </p>

      <span>% {perc}</span>
    </div>
  );
};

export default CoinCard;
