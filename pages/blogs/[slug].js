import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';
import { TelegramShareButton,} from "react-share";
import { FacebookIcon,TelegramIcon,TwitterIcon,} from "react-share";
  import { FacebookShareButton, TwitterShareButton } from "react-share";
  import { MDBCardImage } from 'mdb-react-ui-kit';

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog}).then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setRelated(data);
            }
        });
    };
    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${blog.imgLink}`} />
            <meta property="og:image:secure_url" content={`${blog.imgLink}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn  mr-1 ml-1 mt-1 mb-1" style={{backgroundColor:'#6a8273',color:'white'}}>{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="mr-2 ml-2 mt-2 fonts " style={{color:'#6a8273',textTransform:'uppercase'}} >#{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="" style={{margin:'2%'}}  key={i}>
                <article >
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section className=' ' >
                                <div className="pt-2  " >
                                    <MDBCardImage 
                                        src={blog.imgLink == null ? `${DOMAIN}/static/images/piggybanner1.png`: blog.imgLink }
                                        alt={blog.title}
                                        className="img img-fluid featured-image " //style={{maxHeight:'350px', width:'100%',objectFit:'contain',backgroundColor:''}}
                                        onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)} 
                                    />
                                </div>
                                    <a style={{display:'flex',justifyContent:'flex-end',textAlign:'',fontSize:'small'}} className='text-muted pr-1' href={blog.imgRef}> {blog.imgBy}</a>
                                  <div className=" container  pt-2">
                                        {showBlogCategories(blog)}
                                    </div>
                            </section>
                            <section>
                                <div className="container ">
                                    <h1 className=" pt-4 pb-4 text-center">{blog.title}</h1>
                                </div>
                            </section>
                        </div>
                        <div className="container">
                            <section>
                                <div className="pt-3">{renderHTML(blog.body)}</div>
                                <div className='pt-1'>
                                <p className=" mt-3  shadow p-2" style={{backgroundColor:'#6a8273',color:'white'}}>
                                        Written by{' '}
                                        <Link href={`/profile/${blog.postedBy.username}`}>
                                            <a className='text-white' style={{fontWeight:'bold'}}>{blog.postedBy.username}</a>
                                        </Link>,{' '} {moment(blog.updatedAt).format('LL')}
                                    </p>
                                </div>
                           
                            <div className="pb-2 " style={{}}>
                                      {showBlogTags(blog)}
                                        <br />
                                    </div>
                            </section>
                            <div>
                                <div> <b className='mr-2 ' style={{color:'#6a8273'}}  > share:</b> </div>
                              <div>
                                  
     <FacebookShareButton
      url={`${DOMAIN}/blogs/${query.slug}`}
      quote={blog.title}
      hashtag={"#proofofpiggy"}
      description={""} >
     <FacebookIcon size={32} round /> 
      </FacebookShareButton>
      
      <TwitterShareButton
        title={blog.title}
        url={`${DOMAIN}/blogs/${query.slug}`}
        hashtags={["proofofpiggy", "crypto"]} >
        <TwitterIcon size={32} round />
       </TwitterShareButton>

       <TelegramShareButton  title={blog.title}  url={`${DOMAIN}/blogs/${query.slug}`} >
        <TelegramIcon size={32} round/>
        </TelegramShareButton>
          </div>
            </div>
           </div>
<br/>
                        <div className="container">
                            <h2 className="text-center pt-2 pb-2 text-white text-shadow ">Related blogs</h2>
                            <div className="grid-sistem" >{showRelatedBlog()}</div>
                        </div>

                        <div className="container pt-5 pb-5">{showComments()}</div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default    SingleBlog;