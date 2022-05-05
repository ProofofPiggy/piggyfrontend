import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';
import '../../static/css/styles.css';

const SmallCard = ({ blog}) => {




    return (
        <div className="shadow" style={{borderRadius:'',margin:'2%'}}>
            <section>
            
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <MDBCardImage
                            className="img img-fluid"
                            style={{ height: '200px', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            onError={image => (image.target.src = `https://mdbcdn.b-cdn.net/img/new/slides/017.jpg`)}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link style={{color:'black'}} href={`/blogs/${blog.slug}`}>
                   
                            <h5 className="card-title">{blog.title}</h5>
                 
                    </Link>
                    <div className="text-muted small">{renderHTML(blog.excerpt)}</div>
                </section>
            </div>

            <div className="card-body " >
                Posted {moment(blog.updatedAt).format('LL')} by{' '}
                <Link href={`/profile/${blog.postedBy.username}`}>
                    <a className='color'>{blog.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;