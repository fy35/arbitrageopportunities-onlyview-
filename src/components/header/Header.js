import React from 'react';

const Header = () => {
  return (
    <header className="min-h-[100px] grid grid-cols-5 items-center justify-center gap-3 mb-3">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/320px-Binance_logo.svg.png"
        alt=""
        className="max-w-[120px] max-h-[100px] mx-auto my-auto"
      />
      <img
        src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg"
        alt=""
        className="max-w-[120px] max-h-[100px] mx-auto"
      />
      <img
        src="https://gimg.gateimg.com/image/1628073447683030733gateio_h_2.png"
        alt=""
        className="max-w-[120px] max-h-[100px] mx-auto"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Huobi-logo.png"
        alt=""
        className="max-w-[120px] max-h-[100px] mx-auto"
      />
      <img
        src="https://4actl02jlq5u2o7ouq1ymaad-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/New-Bittrex-logo.png"
        alt=""
        className="max-w-[120px] max-h-[100px] mx-auto"
      />
      <span className="col-span-5 mx-auto  w-full text-center bg-red-500 text-white-500 font-bold">
        DON'T FORGET TO CHECK CONTRACT ADDRESSES
      </span>
    </header>
  );
};

export default Header;
