import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API,DOMAIN } from '../../config';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';


const CategoryCard = ({ blog }) => {
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    return (
        <div className=" " style={{border:'',padding:' 0%'}}>
            <div className='shadow' style={{}}>

            <Link href={`/blogs/${blog.slug}`}>
            <div      className='bg-image hover-zoom justify-content-center align-items-center   bg-image hover-zoom   ' style={{ height:'15rem',border:'none',cursor:'pointer'}}   >
            {blog.categories.map((c, i) => (
      <div>
              {c.name === `trending` ?        <div className='ribbon  ribbon-top-right' key={i} >    
           <span><a className='text-white'> trending    </a>   </span>   </div>:  null}
        
                </div>))}
<MDBCardImage overlay  className=''       position='top' style={{height:'15rem',borderRadius:'0' }} alt='...' 
            src={blog.imgLink == null ? `${DOMAIN}/static/images/piggybanner1.png` : blog.imgLink }
            onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}
                 
                 />
 {blog.categories.map((c, i) => ( 
            <div > {c.name === `piggy's choice` ?  <div className='arrow-ribbon'> <img  src={`${DOMAIN}/static/images/transparent.png`} style={{filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',maxWidth:'100px'}} />
            <br/> piggy's choice</div> : null} </div> ))}

</div>
    </Link>

<div className='card-body'> 
<div>
  <Link  style={{color:'black',cursor:'pointer'}} href={`/blogs/${blog.slug}`}>
  <h5 className=" card-title" style={{cursor:'pointer'}}  >{blog.title}</h5>
 </Link>
</div>
              <section>
                        <div className=" text-left small p-2 text-muted ">{renderHTML(blog.excerpt)}</div>
                        <div className='mt-2'>
                    <Link href={`/blogs/${blog.slug}`}>
                          <a className="btn pt-2 w-100" style={{color:'#6a8273'}}>Read more</a>
                      </Link>
                    </div>
                    </section>
             
 

            <br/>
                <section className=''> 
                <p className="  text-left text-muted">
                Posted by {" "}
                <Link href={`/profile/${blog.postedBy.username}`}>
                    <a style={{color:'#6a8273'}} >{blog.postedBy.username}</a>
                </Link>,{" "}
                {moment(blog.updatedAt).format('LL')} 
                </p>
            </section>
        </div>
            </div>
</div>
    );
};

export default CategoryCard;