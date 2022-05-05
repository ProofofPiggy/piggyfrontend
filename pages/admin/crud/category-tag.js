import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
import React from 'react';

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid pb-5  pt-3">
               <div className='mt-2 mb-2'>

                        <div className="col-md-12  text-white text-shadow ">
                            <h2>Manage Categories </h2>
                        </div>

                        <div className="col-md-6">
                            <Category />
                        </div>
               </div> <hr/>
                     <div className='mt-4 mb-2'  >
                        <div className="col-md-12  text-white text-shadow ">
                            <h2>Manage Tags</h2>
                        </div>
                        <div className="col-md-6">
                            <Tag />
                        </div>
                        </div>
                         </div>  
                 
                
                <br/>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;
