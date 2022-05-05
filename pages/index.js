import Layout from '../components/Layout';
import Link from 'next/link';
import '../static/css/styles.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import { withRouter } from 'next/router';
import Chart from '../components/charts/Chart';
import RecommendedSlider from '../components/RecommendedSlider';
import { TelegramShareButton,} from "react-share";
import { FacebookIcon,TelegramIcon,TwitterIcon,} from "react-share";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from './../config';
import { useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';

const Index = ({categories,blogs}) => {

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

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.log(err);
          }
    }, []);

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article className='m-4 pl-2 mt-0' style={{backgroundColor:'',borderBottom:'solid  #6a8273 1px',cursor:'pointer',color:' #6a8273'}}    key={i}>
            <Link href={`/blogs/${blog.slug}`}>      
                <p>  <b style={{fontSize:'xx-large'}}>  0{i+1}   </b>  {" "} {" "} {blog.title}  </p>   
            </Link>
                </article>
            );
        });
    };

   
    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn  mr-1 ml-1 mt-3" style={{color:'#6a8273'}}>{c.name}</a>
            </Link>
        ));
    };

    return (
        <React.Fragment>
        {head()}
        <Layout>
  <div className=''>
      <div className='container'>
            <article className="overflow-hidden" >
                <div  style={{backgroundColor:''}} >
                <div className="container" >
                    <div className="row"  >
                        <div className="col-md-12 pt-4 text-center">
                            <h2 style={{color:'pink'}}   className="display-3  font-weight-bold text-shadow">
                            Blog from PIGGY hungry for CRYPTO
                            </h2>
                        </div>
                    </div>
                </div>
                </div>
      <div className='text-center pt-2 pb-4'>{ showAllCategories()}</div>
            </article>

            <div className='pt-1'>
       <RecommendedSlider/>
          </div>
     
      <br/>
      <div  className='latest-blog-container' >
  <h2 className='text-shadow ml-4 ' style={{color:' #6a8273'}}  > Latest blogs </h2>
      <div className="text-left   latest-blog" > {showAllBlogs()}</div>
 </div>
  </div>
  <br/>
      <div className='container' >
   <Chart/>
   </div>
   <br/>
   <div className='container' >
                  
                  <ins class="adsbygoogle"
   style={{display:'block'}}
   data-ad-client="ca-pub-8394543269997293"
   data-ad-slot="4639109623"
   data-ad-format="auto"
   data-full-width-responsive="true"/>
   </div>
<div className='share-container'>
<p className='share' style={{textShadow:'0px 0.4px darkblue'}}> share</p> 
 <ul style={{listStyle:'none',margin:'0',padding:'0'}}>
<li  >
 <TwitterShareButton  title={`${APP_NAME}`} url={`${DOMAIN}`} hashtags={["proofofpiggy", "crypto"]} >
  <TwitterIcon round  size={34}  />
  </TwitterShareButton>
  </li>
 <li>
  <FacebookShareButton   url={`${DOMAIN}`} quote={''} hashtag={"#proofofpiggy"} description={`${APP_NAME}`} >
   <FacebookIcon round size={34}  /> 
  </FacebookShareButton>
  </li>
   <li>
   <TelegramShareButton    className='' title={`${APP_NAME}`} url={`${DOMAIN}`}>
   <TelegramIcon round size={34} />
   </TelegramShareButton>
    </li>
     </ul>     
  </div>
 </div>
  </Layout>
  </React.Fragment>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 4;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
       if (data.error) {
           console.log(data.error);} 
       //  if (data === undefined){
          //   null
        // }
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



export default withRouter(Index);