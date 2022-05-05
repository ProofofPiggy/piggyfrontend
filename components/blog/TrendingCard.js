import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API,DOMAIN } from '../../config';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';
import { singleCategory } from '../../actions/category';

const TrendingCard = ({ blog,categories,category }) => {


    return (
        <div className=" " style={{border:'',padding:' 0%'}}>
            <div className='shadow' style={{}}>

            <Link href={`/blogs/${blog.slug}`}>
            <div      className='bg-image hover-zoom justify-content-center align-items-center   bg-image hover-zoom   ' style={{ height:'15rem',border:'none',cursor:'pointer'}}   >
     
<MDBCardImage overlay  className=''       position='top' style={{height:'15rem',borderRadius:'0' }} alt='...' 
            src={blog.imgLink == null ? `${DOMAIN}/static/images/piggybanner1.png` : blog.imgLink }
            onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)} 
                 />    
                  {blog.categories.map((c, i) => ( 
                    <div  key={i}> {c.name === `piggy's choice` ?  <div className='arrow-ribbon'> <img  src={`${DOMAIN}/static/images/transparent.png`} style={{filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',maxWidth:'100px'}} />
                    <br/> piggy's choice</div> : null} </div> ))}
                      </div>
                      </Link>

<div className='card-body pb-1'> 

<header className=''>
                <Link style={{color:'black'}}   href={`/blogs/${blog.slug}`}>
                 
                        <h5 className=" card-title"  style={{cursor:'pointer'}} >{blog.title}</h5>
                 
                </Link>

            </header>
           
            


               
                <div className=" ">
                    <section>
                        <div className=" text-left small p-2 text-muted ">{renderHTML(blog.excerpt)}</div>
                        <div className='mt-2'>
                    <Link href={`/blogs/${blog.slug}`}>
                          <a className="btn pt-2 w-100" style={{color:'#6a8273'}}>Read more</a>
                      </Link>
                    </div>
                    </section>
                </div>
 

            <br/>
                <section className=''> 
                <p className="  text-left text-muted">
                  
                 
                 Published {moment(blog.updatedAt).format('LL')}
                </p>
            </section>
        </div>
            </div>
</div>
    );
};



export default TrendingCard;