import React from 'react';
import _ from 'lodash';
import CoinCard from './CoinCard';

const CoinShow = ({ coins }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {coins &&
        coins.map((coin, index) => {
          return <CoinCard key={index} coin={coin} />;
        })}
    </div>
  );
};

export default CoinShow;
