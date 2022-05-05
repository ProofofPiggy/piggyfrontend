import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../static/css/styles.css';
import Coin from './Coin';

function Chart() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios
      .get(
      // 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d%2C%201y%20'
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter( coin  =>
  coin.name.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div //className='coin-app'
     style={{fontSize:''}}>
      <div >   
    <div style={{textAlign:'center',backgroundColor:'#6a8273',paddingTop:'',color:'white'}}  className='text-shadow '  >
      <div className=' pt-3 pb-2' style={{borderBottom:'none'}}>
       <div className='coin-search' style={{}}>
        <h4 className='text-shadow'> Cryptocurrenc market chart </h4>
       
        <form className='forminput'> 
          <input className="form-control" 
            type='text'
            onChange={handleChange}
            placeholder='Search currency'/>
        </form>
      </div>
      </div>

      <div className='coin-container'>
          <div className='coin-row p-0 '>
 <div className='img-symbol'></div>
    
              <p className=' coin text-right'>Coin</p>
              <p className=' coin-symbol pr-1'></p>
        

              <p className='coin-price pr-4 '>Price</p>
              <p className='coin-volume pr-4'> 24h Volume</p>
              <p className='coin-percent pr-4 '>1h</p>
              <p className='coin-percent-24 pr-4 '>24h</p>
             <p className='coin-percent-7 pr-4 '>7d</p>
              <p className='coin-marketcap pr-4' //style={{paddingRight:'1%'}}
              > Mkt Cap</p>
        
          </div>
        </div>
      </div>

      {filteredCoins.slice(0,5).map(coin => {
        return (
        <>   
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h_in_currency}
            priceChange1h={coin.price_change_percentage_1h_in_currency}
            priceChange7d={coin.price_change_percentage_7d_in_currency}
            /> 
            </>
        );
      })}

      
    </div> </div>
  );
}

export default Chart;