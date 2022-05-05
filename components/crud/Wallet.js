import React from 'react'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getWallets, removeWallet } from '../../actions/wallet';
import { MDBIcon } from 'mdb-react-ui-kit';

const Wallet = () => {
    const [values, setValues] = useState({
        name: '',
        walletAddress:'',
        walletMinet:'',
       walletSymbol:'',
       error: false,
        success: false,
       wallets: [],
        removed: false,
        reload: false
    });

    const { name, error, success,wallets, removed, reload,walletAddress,walletSymbol,walletMinet} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadWallets();
    }, [reload]);

    const loadWallets = () => {
        getWallets().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values,wallets: data });
            }
        });
    };

    const showWallets = () => {
        return wallets.map((w, i) => {
            return (

                <ul className='list-unstyled ' style={{margin:'0' ,justifyContent:''}}>
  
  <li  key={i} className='pb-1 pt-1 ' style={{}}>
 <div style={{display:'flex',flexDirection:'row'}}>   <p style={{textTransform:'uppercase',fontSize:'small'}} className='text-danger pr-2'> {w.name}</p>    
 {w.walletMinet === '' ?  null :
                  <a  style={{fontSize:'small'}} > {w.walletMinet}  </a>           
                    }
              
 </div>
    <label style={{width:'42px',textTransform:'uppercase',textAlign:'left'}}> {w.walletSymbol}</label>
      <input className="ml-1 mr-1 text-muted" style={{border:'none',borderRight:'solid black 1px'}}
       type="text" 
       value={w.walletAddress}
       placeholder={w.walletAddress}/>
              
                 <button
                    onDoubleClick={() => deleteConfirm(w.slug)}
                    title="Double click to delete"
                    
                    className="btn btn-danger "
                    >      Delete Wallet
                </button>
             
                </li>
              
                    </ul>
                 
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this Wallet?');
        if (answer) {
            deleteWallet(slug);
        }
    };

    const deleteWallet = slug => {
        // console.log('delete', slug);
        removeWallet(slug, token).then(data => {
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
        create({ name,walletAddress,walletSymbol,walletMinet }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '',walletMinet:'', walletAddress:'',walletSymbol:'',removed: '', reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };
    const handleChangeWallet = e => {
        setValues({ ...values, walletAddress: e.target.value, error: false, success: false, removed: '' });
    };
  
    const handleChangeSymbol = e => {
        setValues({ ...values,walletSymbol: e.target.value, error: false, success: false, removed: '' });
    };
  
    const handleChangeMinet= e => {
        setValues({ ...values,walletMinet: e.target.value, error: false, success: false, removed: '' });
    };


    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Wallet is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Wallet already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Wallet is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newWalletFom = () => (
        <div className="">
        <div className="">

        <form onSubmit={clickSubmit}>
            <div className="form-group">
          
                <input type="text" placeholder='Currency name' className="form-control" onChange={handleChange} value={name} required />
            </div>
        
            <div className="form-group">
              
                <input type="text" placeholder='Currency Symbol' className="form-control" onChange={handleChangeSymbol} value={walletSymbol} required/>
            </div>
            <div className="form-group">
                <input type="text" placeholder='Wallet Address'  className="form-control" onChange={handleChangeWallet} value={walletAddress}  required/>
             
            </div> 
            <div className="form-group">
                <input type="text" placeholder='Minet'  className="form-control" onChange={handleChangeMinet} value={walletMinet}  />
             
            </div> 
            <div>
                <button type="submit" className="btn btn-dark">
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
            <div onMouseMove={mouseMoveHandler} className=''>
      
                <div className='col-md-6 '>

                {newWalletFom()}
                </div>
             <hr/>
               <div  className='col-md-6  mt-4'>
                   <h5 className='text-white text-shadow pb-2'> Your wallets</h5>
                   <div className='' >


                   {showWallets()}

                 
                </div>
                   </div> 
            </div>
        </React.Fragment>
    );
};


export default Wallet;