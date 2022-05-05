import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';

import RecommendedUpdate from '../../../../components/crud/RecommendedUpdate';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid pt-2 pb-2">
                    <div className="row">
                        <div className="col-md-12 pl-4 pb-2 text-white text-shadow">
                            <h2>Update add</h2>
                        </div>
                        <div className="col-md-12">
                         <RecommendedUpdate/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;