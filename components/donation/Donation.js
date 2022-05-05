import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { MDBIcon } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
      if (ether  < 0.0001)
      throw new Error("Min donation is 0.0001 ETH");


    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    //console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);

  }
};

export default function Donation() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: '0x7b19B1Ba36fE0b20016C19Da7E6d11Eb2702eBaA'
    });
  };

  return (
    <form className="m-2 " style={{display:'flex',justifyContent:'center',textAlign:'center'}} onSubmit={handleSubmit}>
      <div className="  p-2 ">
          <div className="d-flex">
            <div className="">
              <input
                name="ether"
                type="text"
                className="form-control"
                placeholder="Amount in ETH"
              />
            </div>     
            <div className=" ml-1">
            <button
            type="submit"
            className="btn  submit-button focus:ring focus:outline-none w-full" style={{color:'white'}} >
              <MDBIcon fab icon="ethereum" />
           {""} donate
          </button>
          </div>
          </div>
      
        <footer className="">
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
   
      </div> 

    </form>
  );
}
