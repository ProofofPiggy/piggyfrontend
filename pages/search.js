import SearchComponent from '../components/blog/SearchComponent';
import React,{useEffect} from 'react';
import SearchAllComponent from '../components/blog/SearchAll';
  
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';

import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';


const Search =  ({ categories, tags, router }) => {
    const head = () => (
        <Head>
            <title> {APP_NAME} | SEARCH PAGE</title>
            <meta
                name="description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={` ${APP_NAME} | SEARCH PAGE`} />
            <meta
                property="og:description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/proofofpiggy.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.log(err);
          }
    }, []);



    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn mr-1 ml-1 mt-2" style={{backgroundColor:' #6a8273',color:'white'}}>{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn  mr-1 ml-1 mt-3" style={{color:'pink',border:'pink solid 1px'}}>#{t.name}</a>
            </Link>
        ));
    };

    
    return (
        <React.Fragment>
            {head()}
            <Layout>
 <div className='pt-4 pb-2'>
     <div className='container pb-5'>
         
    <h4 className='col-md-12 text-white text-shadow'  > HERE YOU CAN SEARCH BY DIFFERENT CRITERIA</h4>

 <main  className='col-md-12' >
        <SearchComponent/>

        <SearchAllComponent/>

   <div className="col-md-12 mt-5">
     <b className='text-muted'> search by category</b><br/>    
            {showAllCategories()}
      </div>

    <div className="col-md-12 mt-4">
        <b className='text-muted'>
          search by tag </b><br/>
              {showAllTags()}
          </div>
            
  </main>
 </div>

 <div  className='container'>
 <ins class="adsbygoogle"
   style={{display:'block'}}
   data-ad-client="ca-pub-8394543269997293"
   data-ad-slot="4639109623"
   data-ad-format="auto"
   data-full-width-responsive="true"/>
   </div>
</div>               
            </Layout>
        </React.Fragment>
    );
};

Search.getInitialProps = () => {
    let skip = 0;
    let limit = 2;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
     //   if (data.error) {
          //  console.log(data.error);}
          if(data === undefined ){
              null
          }
        else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default    withRouter(Search);