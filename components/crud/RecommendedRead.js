import React from 'react'
import { listSearch } from '../../actions/recommended';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeAdd } from '../../actions/recommended';
import moment from 'moment';
import { MDBBadge } from 'mdb-react-ui-kit';

const RecommendedRead = ({ username }) => {
    const [adds, setAdds] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadAdds();
    }, []);

    const loadAdds = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setAdds(data);
            }
        });
    };

    const deleteAdd = slug => {
        removeAdd(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadAdds();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteAdd(slug);
            setValues({ ...values, searched:'',search:'', results: [],message1:'' });
        }

    };

    const showUpdateButton = add => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${add.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                //<Link >
                    <a  href={`/admin/crud/recommended/${add.slug}`} className="ml-2 btn btn-sm btn-warning">Update</a>
                
                //</Link>
            );
        }
    };

    const showAllAdds = () => {
        return adds.map((add, i) => {
            return (
                <div key={i} className="pb-4">

                    <h5 className='pt-1'>{add.title}</h5>
                   <p>Exp date: {add.expdate}</p>
                    <div>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(add.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(add)}
                    </div>
              <hr/>
                </div>
            );
        });
    };


    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message1: ''
    });

    const { search, results, searched, message1 } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message1: `${data.length} adds found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const searchedAdds = (results = []) => {
        return (
            <div className="pb-4  mb-4 bg-white">

                {results.map((add, i) => {
                    return (
                        <div key={i} className='pb-2'>
                    {showUpdateButton(add)}
                            <Link href={`/recommendeds/${add.slug}`}>
                                <a className="text-primary pl-2">{add.title}</a>
                            </Link>

            
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
  
        <div className="row">
            <div className="col-md-8">
                <input type="search" className="form-control" placeholder="search blog by title" onChange={handleChange} />
            </div>
        
            <div className="col-md-4">
                <button className="btn btn-block " style={{color:'#6a8273'}} type="submit">
                    Search
                </button>
            </div>
        </div>
        </form>
    );






    return (
        <React.Fragment>

<div className="">
        <div className=' pb-4'>


            <div className="pt-3 ">{searchForm()}</div>
            {message1 && <p style={{backgroundColor:'#6a8273',color:'white'}} className='p-1'>{message1}</p>}
            {searched && <div style={{ maxHeight:'280px',overflowY:'scroll'}}>{searchedAdds(results)}</div>}
        </div>

        </div>

            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    <p>total adds: {adds.length}</p>
                    {showAllAdds()}
                </div>
                
            </div>
        </React.Fragment>
    );
};

export default RecommendedRead;