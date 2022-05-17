import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Huobi = (props) => {
  useEffect(() => {
    const fetchHuobi = async () => {
      try {
        const res = await axios.get('https://api.huobi.pro/market/tickers');
        const status = await axios.get('https://api.huobi.pro/v1/common/symbols');

        const merge = [
          ...[...res.data.data, ...status.data.data]
            .reduce(
              (acc, curr) => acc.set(curr.symbol, { ...acc.get(curr.symbol), ...curr }),
              new Map()
            )
            .values(),
        ];

        const tradeableCoins = _.filter(merge, function (n) {
          if (n.state === 'online') {
            return n;
          } else {
            return false;
          }
        });

        const newObj = tradeableCoins.map(({ symbol, close: price, ...rest }) => ({
          symbol: symbol.toUpperCase(),
          Huobi: price,
        }));

        props.huobiTicker(newObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHuobi();
  }, []);

  return;
};

export default Huobi;
