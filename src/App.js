import './App.css';
import Header from './components/header/Header';
import CoinList from './components/coins/CoinList';

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <CoinList />
    </div>
  );
}

export default App;
