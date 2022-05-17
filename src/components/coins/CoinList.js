import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Binance from './exchanges/Binance';
import Kucoin from './exchanges/Kucoin';
import Gateio from './exchanges/Gateio';
import Huobi from './exchanges/Huobi';
import Bittrex from './exchanges/Bittrex';
import CoinShow from './CoinShow';

const CoinList = () => {
  const [binance, setBinance] = useState('');
  const [kucoin, setKucoin] = useState('');
  const [gateio, setGateio] = useState('');
  const [huobi, setHuobi] = useState('');
  const [bitrex, setBittrex] = useState('');

  const [latest, setLatest] = useState('');

  const result = [
    ...[...binance, ...kucoin, ...gateio, ...huobi, ...bitrex]
      .reduce((acc, curr) => acc.set(curr.symbol, { ...acc.get(curr.symbol), ...curr }), new Map())
      .values(),
  ];

  const result2 = result.map((item, index) => {
    const { symbol, ...others } = item;
    return { symbol, prices: others };
  });

  const result3 = result2.map((item, index) => {
    const { symbol, prices } = item;
    return {
      symbol,
      prices,
      maxExchange: getMaxKey(prices),
      max: getMax(prices),
      minExchange: getMinKey(prices),
      min: getMin(prices),
      perc: getPerc(prices),
    };
  });

  useEffect(() => {
    var latestResult = _.filter(result3, function (n) {
      return _.keys(n.prices).length > 1;
    });
    var percFilteredResult = _.filter(latestResult, function (n) {
      return n.perc < 20 && n.perc > 3;
    });
    var sortedResults = _.orderBy(percFilteredResult, 'perc', 'desc');

    setLatest(sortedResults);
  }, [binance, kucoin, gateio]);

  return (
    <>
      <Binance binanceTicker={(e) => setBinance(e)} />
      <Kucoin kucoinTicker={(e) => setKucoin(e)} />
      <Gateio gateioTicker={(e) => setGateio(e)} />
      <Huobi huobiTicker={(e) => setHuobi(e)} />
      <Bittrex bittrexTicker={(e) => setBittrex(e)} />
      <CoinShow coins={latest} />
    </>
  );
};

export default CoinList;

const getMax = (data) => {
  let maxList = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      maxList.push(element);
    }
  }

  const max = Math.max(...maxList);
  return max;
};
const getMaxKey = (data) => {
  var maxKey = Object.keys(data).reduce((a, b) => (data[a] > data[b] ? a : b));
  return maxKey;
};
const getMin = (data) => {
  let maxList = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      maxList.push(element);
    }
  }
  const min = Math.min(...maxList);
  return min;
};
const getMinKey = (data) => {
  var minKey = Object.keys(data).reduce((a, b) => (data[a] < data[b] ? a : b));
  return minKey;
};
const getPerc = (data) => {
  var max = getMax(data);
  var min = getMin(data);
  var perc = (max * 100) / min - 100;
  return perc;
};
