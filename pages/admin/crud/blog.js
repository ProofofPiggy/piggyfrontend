import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
//import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';

import dynamic from 'next/dynamic'
const BlogCreate = dynamic(() => import('../../../components/crud/BlogCreate'), { ssr: false })


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid pt-2 ob-2">
                    <div className="row">
                        <div className="col-md-12 pl-4 pb-2 text-white text-shadow">
                            <h2>Create a new blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};
 
export default Blog;
