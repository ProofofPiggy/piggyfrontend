import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
 import { MDBBtn,MDBCardImage } from 'mdb-react-ui-kit';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12  pb-2 text-white text-shadow">
                            <h2>Manage blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;