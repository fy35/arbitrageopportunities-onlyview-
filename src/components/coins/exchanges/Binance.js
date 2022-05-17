import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Binance = (props) => {
  useEffect(() => {
    const fetchBinance = async () => {
      try {
        const res = await axios.get(`https://api.binance.com/api/v3/ticker/24hr`);
        const status = await axios.get('https://api.binance.com/api/v3/exchangeInfo');

        const merge = [
          ...[...res.data, ...status.data.symbols]
            .reduce(
              (acc, curr) => acc.set(curr.symbol, { ...acc.get(curr.symbol), ...curr }),
              new Map()
            )
            .values(),
        ];

        const tradeableCoins = _.filter(merge, function (n) {
          if (n.status === 'TRADING') {
            return n;
          } else {
            return false;
          }
        });

        const newObj = tradeableCoins.map(({ symbol, lastPrice: price, ...rest }) => ({
          symbol,
          Binance: price,
        }));

        props.binanceTicker(newObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBinance();
  }, []);

  return;
};

export default Binance;
