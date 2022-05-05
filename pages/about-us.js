import { useState,useEffect} from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import '../static/css/styles.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";  
import { getWallets } from '../actions/wallet';
import { APP_NAME,DOMAIN,FB_APP_ID } from '../config';
import SocialIcons from '../components/SocialIcons';

const AboutUs = () => {

  const head = () => (
    <Head>
        <title>
         {APP_NAME}
        </title>
        <meta name="description" content='Blog from Piggy hungry for crypto' />
        <link rel="canonical" href={`${DOMAIN}`} />
        <meta property="og:title" content={`${APP_NAME}`} />
        <meta property="og:description" content='Blog from Piggy hungry for crypto' />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
       
        <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/proofofpiggy.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
);






  const [values, setValues] = useState({
    name: '',
    walletAddress:'',
   walletSymbol:'',
   wallets: [],
 
});




const { wallets, name,walletAddress,walletSymbol} = values;

  useEffect(() => {
    loadWallets();
}, []);

useEffect(() => {
  try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
}, []);



const loadWallets = () => {
    getWallets().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setValues({ ...values,wallets: data });
        }
    });
};


    return (<>
     {head()}
    
   
        <Layout>
   <div className=' p-2 pt-4' style={{minHeight:'45vh'}}>
   <div className="container">
  <div className="row ">
          <div className="col-md-8 p-2 pt-4 ">
              <div className='about'><p >
                 This is the personal blog of Piggy who searches for the latest crypto and blockchain news every day and wants to share only the best with other crypto enthusiasts out there. 
                </p>
                <p>
                  This is a free, fun and educational blog WITHOUT FINANCIAL ADVICE TO ANYONE!
                  </p>
<p>

Suggestions for potential collaboration or advertising can be made through social media.
</p>
 </div>
 <br/>
  <SocialIcons/>
                  </div>
      
      <div className="col-md-4 p-2 pt-4">
   
 
            {wallets.length === 0 ? null : <h5 className='pb-2  text-white text-shadow'>DONATE</h5> }
        
     
    <ul className='list-unstyled pb-2' style={{margin:'0' }}>
{wallets.map((w,i) => (
              <li key={i} className=''>
    <label style={{width:'42px',textTransform:'uppercase'}}>{w.walletSymbol}</label>
      <input className="ml-1 " style={{border:'none',borderRight:'solid black 1px'}}
       type="text" 
       value={w.walletAddress}
       placeholder={w.walletAddress}/>

    <button onClick={ (() => {
      copy(`${w.walletAddress}`);
      toast.success(`You have copied "${w.walletAddress}" ${w.walletMinet === '' ? ' ' : ` - ${w.walletMinet}`  }`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });})} style={{backgroundColor:'transparent',border:'none'}}   
      >
      <MDBIcon far icon="clone" />
       </button>
  
              </li>))}
  </ul>
  </div>
 </div>
 </div>


 <div  className='container mt-4'>
   <ins class="adsbygoogle"
   style={{display:'block'}}
   data-ad-client="ca-pub-8394543269997293"
   data-ad-slot="4639109623"
   data-ad-format="auto"
   data-full-width-responsive="true"/>
   </div>  


 <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
style={{width:'auto'}}
/>
</div>
 </Layout> </>
    );
};

export default AboutUs;