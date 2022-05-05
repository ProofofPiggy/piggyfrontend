import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CardBlog from '../../components/blog/CardBlog';
import TagMenu from '../../components/TagMenu';

const Tag = ({ tag, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${tag.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return (
        <React.Fragment>
            {head()}
            <Layout>
                    <TagMenu/>
                <main className='pt-4 pb-4' style={{minHeight:'40vh'}}>
                    <div className="container-fluid text-center">
                        <header>
                            <h1 className="display-5 font-weight-bold text-shadow" style={{textTransform:'uppercase',color:'pink'}}>#{tag.name}</h1>

{ blogs.length === 0 ? <p className='color' style={{textTransform:'uppercase',fontSize:'',color:'pink'}}>Sorry, currently no blogs. </p> :

                            <p className='' style={{textTransform:'uppercase',fontSize:'small',color:'pink'}} >Total blogs:{" "} <b style={{fontSize:'medium'}}>
                         {blogs.length}
                             </b>
                         </p>
}

                            <div  //</header>className="col-md-12 pt-3" 
                            className='category-grid'
                            >
                                {blogs.map((b, i) => (
                                    <div style={{margin:'2%'}}>
                                        <CardBlog key={i} blog={b} />
                                     
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, blogs: data.blogs, query };
        }
    });
};

export default Tag;