import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Bittrex = (props) => {
  useEffect(() => {
    const fetchBittrex = async () => {
      try {
        const res = await axios.get(`https://api.bittrex.com/v3/markets/tickers`);
        const status = await axios.get('https://api.bittrex.com/v3/markets');

        const merge = [
          ...[...res.data, ...status.data]
            .reduce(
              (acc, curr) => acc.set(curr.symbol, { ...acc.get(curr.symbol), ...curr }),
              new Map()
            )
            .values(),
        ];

        const tradeableCoins = _.filter(merge, function (n) {
          if (n.status === 'ONLINE') {
            return n;
          } else {
            return false;
          }
        });

        tradeableCoins.map((item) => {
          item.symbol = item.symbol.replace('-', '');
        });

        const newObj = tradeableCoins.map(({ symbol, lastTradeRate: price, ...rest }) => ({
          symbol,
          Bittrex: price,
        }));

        props.bittrexTicker(newObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBittrex();
  }, []);

  return;
};

export default Bittrex;
