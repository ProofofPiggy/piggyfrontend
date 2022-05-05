import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Wallet from '../../../components/crud/Wallet';

import Link from 'next/link';
import React from 'react';

const WalletTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container pb-5  pt-3">
               <div className='mt-2 mb-2'>

                        <div className="col-md-12  text-white text-shadow ">
                            <h2>Manage social Wallets </h2>
                        </div>

                        <div className="col-md-12 pt-3">
                            <Wallet />
                        </div>
               </div> 
                     
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default WalletTag;
