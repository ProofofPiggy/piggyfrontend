import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row pt-5 pb-5 ">
                        <div className="col-md-12 pb-4 ">
                            <h2 className='pl-2 text-white text-shadow'>User Dashboard</h2>
                        </div>
                        <div className="col-md-6">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a style={{color:'#6a8273'}} href="/user/crud/blog">Create Blog</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/crud/blogs">
                                        <a style={{color:'#6a8273'}}>Update/Delete Blog</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a style={{color:'#6a8273'}} href="/user/update">Update profile</a>
                                </li>
                            </ul>
                        </div>
                    
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;