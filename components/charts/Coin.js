import React from 'react';
import './../../static/css/styles.css';

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  priceChange1h,
  priceChange7d
}) => {
  return (
  
  <div className=''>


<div className='coin-container' >
          <div className='coin-row p-0 text-muted pt-2'>
       
       <img className='img-symbol'  src={image}/>
  
   
              <p className='coin '>{name} </p>
      
            
              <p className='  coin-symbol pr-1' style={{textTransform:'uppercase'}}>{symbol}</p>
      
           
              <p className= ' coin-price pr-1 '>${price}</p>
              <p className='coin-volume pr-1'> ${volume.toLocaleString()}</p>
              {priceChange1h < 0 ? (
              <p className='coin-percent  red pr-1 '>{priceChange1h.toFixed(2)}%</p>):(
              <p className='coin-percent green  pr-1 '>{priceChange1h.toFixed(2)}%</p>)}
                 {priceChange < 0 ? (
              <p className='coin-percent-24 red pr-1 '>{priceChange.toFixed(2)}%</p>):(
                <p className='coin-percent-24 green pr-1 '>{priceChange.toFixed(2)}%</p>

              )}
              {priceChange7d < 0 ? (
             <p className='coin-percent-7 red pr-1 '>{priceChange7d.toFixed(2)}%</p>):(
              <p className='coin-percent-7 green pr-1 '>{priceChange7d.toFixed(2)}%</p>
             )}
              <p className='coin-marketcap ' //style={{paddingRight:'1%'}}
              >   ${marketcap.toLocaleString()}</p>
     
          </div></div>
    </div>
  );
};

export default Coin;