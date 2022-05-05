import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin> <div style={{minHeight:'50vh'}}>

 
                <div className="container" >
                    <div className="row "   >
                        <div className="col-md-12   pt-5 pb-4  text-center text-white text-shadow"  >
                            <h1>Admin Dashboard</h1>
                        </div>
                        <div className="col-md-6 pt-2">
                            <h3 className='text-muted'>Blog</h3>
                            <ul class="list-group " style={{fontSize:'large'}}>

                       

                                <li className="list-group-item">
                                    <a style={{color:'#6a8273'}} href="/admin/crud/blog">Create Blog</a>
                                </li>
                              
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs" className='color' >
                                        <a style={{color:'#6a8273'}} >Update/Delete Blog</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a style={{color:'#6a8273'}}>Create Ctegory and Tag</a>
                                    </Link>
                                </li>
                          

                             
                               
                            </ul>   </div>
                      
                        <div className="col-md-6 pt-2">
                        <h3 className='text-muted'>Add</h3>
                            <ul class="list-group" style={{fontSize:'large'}} >
              

                                <li className="list-group-item">
                                    <a href="/admin/crud/recommended"   style={{color:'#6a8273'}}   >  Create add</a>
                                </li>
                              
                                <li className="list-group-item">
                                    <Link  href="/admin/crud/recommendeds" >
                                        <a  style={{color:'#6a8273'}}  >Update/Delete add</a>
                                    </Link>
                                </li>
  

                   </ul>
                  
                        </div>

                        <div className="col-md-6 pt-2">
                            <h3 className='text-muted'>Social stuf</h3>
                   <ul style={{fontSize:'large'}}  class="list-group">
                   <li className="list-group-item">
                                    <Link href="/admin/crud/icon">
                                        <a style={{color:'#6a8273'}}>Create Icon</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/wallet">
                                        <a style={{color:'#6a8273'}}>Create Wallet</a>
                                    </Link>
                                </li>
                                
                   </ul>

                        </div>

                        <div className="col-md-6 pt-2">
                            <h3 className='text-muted'>Profile</h3>
                   <ul style={{fontSize:'large'}}  class="list-group">
                   <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a style={{color:'#6a8273'}}>Update Profile</a>
                                    </Link>
                                </li>

                                
                   </ul>

                        </div>
                    </div>
                </div>           </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;