import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState,useEffect } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { MDBBtn } from 'mdb-react-ui-kit';
import CardBlog from '../../components/blog/CardBlog';
import CategoryMenu from '../../components/CategoryMenu';
import '../../static/css/styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import ScrollToTop from '../../components/ScroolToTop';

const Blogs = ({ blogs, categories, totalBlogs, blogsLimit, blogSkip, router,title }) => {
    const head = () => (
        <Head>
            <title>All blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Blog of Piggy who searches for the latest crypto and blockchain news every day and wants to share only the best with other crypto enthusiasts out there"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`The latest crypto and blockchain news | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Blog of Piggy who searches for the latest crypto and blockchain news every day and wants to share only the best with other crypto enthusiasts out there"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/proofofpiggy.png`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/proofofpiggy.png`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.log(err);
          }
    }, []);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
           // if (data.error) {
             //   console.log(data.error); }
             if (data === undefined){
                 null
             }
            else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
              
       <MDBBtn className='col-md-4 ' style={{backgroundColor:'transparent',color:'#6a8273'}}   onClick={loadMore}   >
       load more...
       </MDBBtn>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article className=''   key={i}>
                    <CardBlog blog={blog} />
                </article>
            );
        });
    };

 
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article   key={i}>
                <CardBlog blog={blog} /> 
            </article>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
             <div>
      <CategoryMenu/>
                <main>
                    <div className="cotainer pt-2 ">
                        <header> 
                                <h1 className="display-4 mt-3 font-weight-bold text-center text-white text-shadow">
                                All Blogs
                                </h1>
                        </header>       
                    </div>   
                    <div style={{display:'flex',justifyContent:'center',textAlign:'center',alignItems:'center',alignContent:'center',justifyItems:'center'}}></div>
                    <div style={{padding:'1% 5%'}}  className='' >
                    <div className="card-list"> {showAllBlogs()}</div>
                    <div className="card-list">{showLoadedBlogs()}</div>
                    <div className="text-center m-4">{loadMoreButton()}</div>
                    </div>
                   
                    <div style={{backgroundColor:'',padding:'0 2%'}}>
                  
                    <ins class="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-8394543269997293"
     data-ad-slot="4639109623"
     data-ad-format="auto"
     data-full-width-responsive="true"/>
     </div>
               
  </main>          
     </div><ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 6;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error); }
       //  if (data ===undefined ){
         //    null
         //}
             else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                recommendeds:data.recommendeds ,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Blogs);
