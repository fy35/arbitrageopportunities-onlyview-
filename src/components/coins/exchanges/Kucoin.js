import { useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

const Kucoin = (props) => {
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.kucoin.com/api/v1/market/allTickers',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const fetchKucoin = async () => {
      try {
        const res = await axios(config);

        res.data.data.ticker.map((item) => {
          item.symbol = item.symbol.replace('-', '');
        });

        var filteredMargins = _.filter(res.data.data.ticker, function (n) {
          if (n.symbol.includes('3S') || n.symbol.includes('3L')) {
            return false;
          } else {
            return n;
          }
        });

        const newObj = filteredMargins.map(({ symbol, buy: price, ...rest }) => ({
          symbol,
          Kucoin: price,
        }));

        props.kucoinTicker(newObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKucoin();
  }, []);

  return;
};

export default Kucoin;
