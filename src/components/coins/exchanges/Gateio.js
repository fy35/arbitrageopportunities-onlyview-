import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Gateio = (props) => {
  useEffect(() => {
    const fetchGateio = async () => {
      try {
        const res = await axios.get('https://api.gateio.ws/api/v4/spot/tickers');
        const status = await axios.get('https://api.gateio.ws/api/v4/spot/currency_pairs');

        const statusMapped = status.data.map(({ id: currency_pair, ...rest }) => ({
          currency_pair,
          ...rest,
        }));

        var merge = _.map(res.data, function (item) {
          return _.merge(item, _.find(statusMapped, { currency_pair: item.currency_pair }));
        });

        const tradeableCoins = _.filter(merge, function (n) {
          if (n.trade_status === 'tradable') {
            return n;
          } else {
            return false;
          }
        });

        tradeableCoins.map((item) => {
          item.currency_pair = item.currency_pair.replace('_', '');
        });

        var filteredMargins = _.filter(tradeableCoins, function (n) {
          if (n.currency_pair.includes('3S') || n.currency_pair.includes('3L')) {
            return false;
          } else {
            return n;
          }
        });

        const newObj = filteredMargins.map(({ currency_pair: symbol, last: price, ...rest }) => ({
          symbol,
          Gateio: price,
        }));

        props.gateioTicker(newObj);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGateio();
  }, []);

  return;
};

export default Gateio;
