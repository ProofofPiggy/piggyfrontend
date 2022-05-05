import React,{useState,useEffect} from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/dist/client/link';
import NewsletterSubscribe from './form/SubscribeForm';
import './../static/css/styles.css'
import Donation from './donation/Donation';
import { getIcons } from '../actions/icon';
import { DOMAIN } from '../config';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

export default function Footer() {
  const [values, setValues] = useState({
    name: '',
    iconLink:'',
   iconCode:'',
   icons: [],
  
});

const { name,icons,iconLink,iconCode} = values;
useEffect(() => {
    loadIcons();
}, []);

const loadIcons = () => {
    getIcons().then(data => {
      if (data.error) {
            console.log(data.error); } 
      //  if(data === undefined){
       //   null
       // }
        else {
            setValues({ ...values,icons: data });
        }
    });
};

  return (
 
 <div  style={{  boxShadow: '0px 0 10px 0px rgba(0, 0, 0, 0.8)'}}>
    <div className='   mt-4 '  style={{ background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)', background: 'white', display: 'flex-box', justifyContent: 'center', alignItems: 'center', textAlign: 'center',background:'#6a8273' }}>
      <div style={{paddingTop:'1%'}}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center',paddingBottom:'1%' }}>
            <img style={{ height: '85px', filter:' drop-shadow(0 2px 2px rgba(0,0,0,.8))' }} src={`${DOMAIN}/static/images/piggytransparent.png`} />
          </div>
          <div>
            <ul className='footer-links'>
              <li className=''><Link href='/about-us ' style={{textDecoration:'none'}} >
                <a className='text-white ' style={{textDecoration:'none'}}   > 
                  About Us
                </a></Link>
              </li>
              <li className=''>
                <Link href='/termsofuseandprivacypolicy' className='text-white' style={{textDecoration:'none'}}  >    
                <a className='text-white ' style={{textDecoration:'none'}}   > 
                  Terms of Use and
                  Privacy Policy</a>
                </Link>
              </li>
          
            </ul>
          </div>
         
          <div>
            <ul className='list-unstyled mb-2' style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              {icons.map((ic,i)=>(
              <li key={i}>
              <a href={ic.iconLink} target='_blank' style={{textDecoration:'none',opacity:'',color:'pink'}} className='icon-shadow'  >
                <MDBIcon fab icon={ic.iconCode} className='m-2 zoom-box' size='2x' />
                </a>
              </li> ))}  </ul></div>
        </div>
        <div  className=' pt-2 footer-buttons ' >
          <div className='m-2'>
            <h5 className='text-white text-shadow'>Donate to suport my work </h5>
            <Donation />
          </div>
          <div className='m-2'>
            <h5 className='text-white text-shadow'> Subscribe for newsletter</h5>
            <NewsletterSubscribe />
          </div>
        </div>
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        &copy; 2022 {"  "
        } PROOF OF PIGGY. { "  "}All rights reserved.{" "}Designe by {" "} <a href='https://marijana-portfolio-website.web.app/'>

     <img src={`${DOMAIN}/static/images/devlogo.png`} style={{paddingBottom:'0.2%',opacity:'60%'}} />
        </a>
      </div>
    </div>
  </div>
  );
}