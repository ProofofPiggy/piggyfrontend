import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";  

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';


export default function TxList({ txs }) {
  if (txs.length === 0  ) return null;

  const copyTo = () => {
    copy(`${item.hash}`);
  }

  return (
    <>
   

      {txs.map((item) => (
        <div key={item} style={{display:'none'}}>
          <div className="">
                {toast.success(<div className='text-left p-1'>
<b  style={{fontSize:'small'}}> THANK YOU FOR YOUR DONATION!</b><br/>
<b  style={{fontSize:'small'}}>TRANSACTION DETAILS: </b><br/>
            {item.hash}   <button onClick={ () => {
    copy(`${item.hash}`);
  }} style={{backgroundColor:'transparent',border:'none'}}     >
      <MDBIcon far icon="clone" />
       </button> </div>)}
          </div>
        </div>
      ))}
   <ToastContainer
position="top-right"
autoClose={9000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
style={{width:'auto'}}
/>
    </>
  );
}
