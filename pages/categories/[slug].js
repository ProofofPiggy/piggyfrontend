import React,{useEffect} from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import CategoryCard from '../../components/blog/CategoryCard';
import CategoryMenu from '../../components/CategoryMenu';
import TrendingCard from '../../components/blog/TrendingCard'
import CardBlog from '../../components/blog/CardBlog';
import PiggyCard from '../../components/blog/PiggyCard';
import ScrollToTop from '../../components/ScroolToTop';


const Category = ({ category, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
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

    return (
<div>


            {head()}
            <Layout>
             <CategoryMenu/>
                <main className=' pt-4 pb-4' style={{minHeight:''}}>
                    <div className="container-fluid text-center ">
                        <header>
                            <div>
                      {category.name === 'trending' ?  <h1 className="display-4 font-weight-bold text-uppercase  text-white text-shadow"> all trending blogs</h1>
                      : <h1 className="display-4 font-weight-bold text-uppercase   text-white text-shadow ">{category.name}</h1>}
                        </div>
             {blogs.length === 0 ? <p className='color' style={{textTransform:'uppercase',fontSize:''}}>Sorry, currently no blogs in this category. </p> :

                          <p className='color' style={{textTransform:'uppercase',fontSize:'small'}} >Total blogs:{" "} <b style={{fontSize:'medium'}}>
                         {blogs.length}
                             </b>
                         </p>}
                                </header>
                                </div>
                            <div className="category-grid">
                                {blogs.map((b, i) => (
                                    <div >
                                   {category.name === `piggy's choice`  ?  <div style={{padding:'3%'}} > <PiggyCard key={i}  blog={b}/>  </div>
                                   : null}
                                    </div>
                                ))}
                            </div>

                           <div className="category-grid">
                                {blogs.map((b, i) => (
                                    <div style={{}} >
                                   {category.name !== 'trending' && category.name !== `piggy's choice`  ? <div style={{padding:'3%'}} > <CategoryCard key={i}  blog={b}/>  </div>
                                   : null}
                                
                                    </div>
                                ))}
                            </div>

                            <div className="category-grid">
                                {blogs.map((b, i) => (
                                    <div >
                                   {category.name === 'trending'  ?  <div style={{padding:'3%'}} ><TrendingCard key={i} blog={b} /></div>
                                   : null }
                                    </div>
                                ))}
                            </div>

 <div style={{padding:'0 2%'}}>
 <ins class="adsbygoogle"
   style={{display:'block'}}
   data-ad-client="ca-pub-8394543269997293"
   data-ad-slot="4639109623"
   data-ad-format="auto"
   data-full-width-responsive="true"/>
   </div>
   </main>
<ScrollToTop/>
            </Layout>
            </div>
    );
};




Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
       if (data.error) {
           console.log(data.error); } 
          //  if (data === undefined){
             //   null
           // }
            else {
            return { category: data.category, blogs: data.blogs, query };
        }
    });
};

export default Category;