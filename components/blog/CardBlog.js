import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API,DOMAIN } from '../../config';
import { MDBCardImage } from 'mdb-react-ui-kit';
import '../../static/css/styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

const CardBlog = ({ blog }) => {
    
    return (

        <div className=" ">
            <div style={{padding:'4%'}} className=''>

          <div className='shadow'  style={{}}>   
            <section>       
    <Link href={`/blogs/${blog.slug}`}>
   
        <div className='bg-image hover-zoom justify-content-center align-items-center   bg-image hover-zoom   ' style={{height:'16rem',border:'none',borderRadius:''}}   >
   {blog.categories.map((c, i) => (
       <div>
          {c.name === `trending` ?     
         <div className='ribbon ribbon-top-right' key={i} >  
          <span className='' style={{color:' white'}}><a className=''> trending</a> </span> 
           </div>
          : null }
           </div>
                ))}
                   
     <MDBCardImage overlay  className='' position='top' style={{height:'16rem',borderRadius:'0',position:'relative',zIndex:'-2'}} alt='...' 
          src={blog.imgLink == null ? `${DOMAIN}/static/images/piggybanner1.png` : blog.imgLink }
          onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}
          />         {blog.categories.map((c, i) => ( 
            <div key={i} > {c.name === `piggy's choice` ?  <div className='arrow-ribbon'> <img  src={`${DOMAIN}/static/images/transparent.png`} style={{filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',maxWidth:'100px'}} />
            <br/> piggy's choice</div> : null} </div> ))}
        </div>

    </Link>
  
  </section>

 
   

            <div className="card-body">
                <section>
                    <Link style={{color:'black'}} href={`/blogs/${blog.slug}`}>
                       
                            <h5 className="card-title" style={{cursor:'pointer'}}>{blog.title}</h5>
                   
                    </Link>
                    <div className="card-text text-muted"  >{renderHTML(blog.excerpt)}</div>
                    <div className='mt-2'>
                    <Link href={`/blogs/${blog.slug}`}>
                          <a className="btn  pt-2 w-100" style={{color:'#6a8273'}}>Read more</a>
                      </Link>
                    </div>
                </section>
            </div>

            <div className="card-body  bg-da text-muted"  >
                Posted by {" "}
                <Link href={`/profile/${blog.postedBy.username}`}>
                    <a style={{color:'#6a8273'}} >{blog.postedBy.username}</a>
                </Link>,{" "}
                {moment(blog.updatedAt).format('LL')} 
            </div>
        </div>
          </div>
          </div>
    );
};

export default CardBlog;