import React from 'react'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getIcons, removeIcon } from '../../actions/icon';
import { MDBIcon } from 'mdb-react-ui-kit';

const Icon = () => {
    const [values, setValues] = useState({
        name: '',
        iconLink:'',
       iconCode:'',
       error: false,
        success: false,
       icons: [],
        removed: false,
        reload: false
    });

    const { name, error, success,icons, removed, reload,iconLink,iconCode} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadIcons();
    }, [reload]);

    const loadIcons = () => {
        getIcons().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values,icons: data });
            }
        });
    };

    const showIcons = () => {
     
 
        return icons.map((ic, i) => {
            return (
            <div  key={i} className="m-2 p-2 " style={{width:'auto',border:'solid lightgray 1px',}} >
                <div className='' style={{display:'block', justifyContent:'center',textAlign:'center'}}   >
<div>

                <p>  {ic.name}</p>
                    <div>
                    <MDBIcon fab icon={ic.iconCode} className='m-2 zoom-box' size='2x' />
               
                    </div>{ic.iconLink === '' ? <a  style={{fontSize:'small'}}>no link</a>:
                  <a  style={{fontSize:'small'}} href={ic.iconLink} target='_blank'> {ic.iconLink}  </a>           
                    }
              
</div>

              
                 <button
                    onDoubleClick={() => deleteConfirm(ic.slug)}
                    title="Double click to delete"
                    
                    className="btn btn-outline-danger "
                    >      Delete icon
                </button>
                    </div>
                    </div>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this icon?');
        if (answer) {
            deleteIcon(slug);
        }
    };

    const deleteIcon = slug => {
        // console.log('delete', slug);
        removeIcon(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name,iconLink,iconCode, }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', iconLink:'',iconCode:'',removed: '', reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };
    const handleChangeIcon = e => {
        setValues({ ...values, iconLink: e.target.value, error: false, success: false, removed: '' });
    };
  
    const handleChangeCode = e => {
        setValues({ ...values,iconCode:e.target.value, error: false, success: false, removed: '' });
    };


    const showSuccess = () => {
        if (success) {
            return <p className="text-success">icon is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">icon already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">icon is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newIconFom = () => (
        <div className="">
        <div className="col-md-12  pb-4">

        <form onSubmit={clickSubmit}>
            <div className="form-group">
          
                <input type="text" placeholder='icon name' className="form-control" onChange={handleChange} value={name} required />
            </div>
        
         
            <div className="form-group">
                <input type="text" placeholder='social media link '  className="form-control" onChange={handleChangeIcon} value={iconLink} required />
             
            </div> 
            <div className="form-group">
              
              <span style={{display:'inline-flex'}}>   
              <input type="text" placeholder='icon code' className="form-control" onChange={handleChangeCode} value={iconCode} required />
                      <MDBIcon fab icon={iconCode} className='m-2 zoom-box' size='2x' />  
                      </span>
          </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
        </div></div>
    );

    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}  >
          

            <div className=''>
              <div>

                {newIconFom()}
              </div>
              <h5 className='text-white text-shadow pb-2'> Your icons</h5>
                   <div className='icon-container' >
                   {showIcons()}
                   </div> 
                </div>
             <hr/>
              
                </div>
        </React.Fragment>
    );
};


export default Icon;