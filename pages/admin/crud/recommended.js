import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import RecommendedAdd from '../../../components/crud/Recommended';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
import React from 'react';

const RecommendedPage = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid pt-2 pb-2 ">
               <div className='p-2'>

                        <div className="col-md-12 text-white text-shadow  ">
                            <h2>Create add</h2>
                        </div>

                        <div className="row">
                    <RecommendedAdd/>
                        </div>
               </div> 
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default RecommendedPage;
