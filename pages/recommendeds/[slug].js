import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleAdd } from '../../actions/recommended';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

  import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';

const RecommendedAdd = ({ add, query }) => {


    const head = () => (
        <Head>
            <title>
                {add.title} | {APP_NAME}
            </title>
            <meta name="description" content={add.title} />
            <link rel="canonical" href={`${DOMAIN}/recommendeds/${query.slug}`} />
            <meta property="og:title" content={`${add.title}| ${APP_NAME}`} />
            <meta property="og:description" content={add.title} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/recommendeds/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
          
           <meta property="og:image" content={`${add.addimg}`} />
            <meta property="og:image:secure_url" content={`${add.addimg}`}  />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

   

    

    return (
        <React.Fragment>
              {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                       
  <section className=' ' >
                                <div className=" pt-2 " style={{ }}>
                                    <MDBCardImage 
                                        src={add.addimg == null ? `${DOMAIN}/static/images/piggybanner1.png` : add.addimg }
                                        onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}
                                        alt={add.title}
                                        className="img img-fluid featured-image " //style={{maxHeight:'350px', width:'100%',objectFit:'contain',backgroundColor:''}}
                                     
                                    />
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-12  pt-3"   >{renderHTML(add.body)}</div>
                                <div>
                               
                                </div>
                            </section>
                        </div>

                       
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

RecommendedAdd.getInitialProps = ({ query }) => {
    return singleAdd(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { add: data, query };
        }
    });
};

export default RecommendedAdd;