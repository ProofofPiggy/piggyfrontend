import { DOMAIN } from "../config"

export default function Custom404() {
    return(<div className="bg-dark" style={{width:'100vw',height:'100vh',paddingTop:'20%'}}>

    <div className="text-center container " style={{display:'block',justifyContent:'center'}}>

    <img  src={`${DOMAIN}/static/images/transparent.png`} style={{filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',maxWidth:'100%'}} />
         <h1 style={{maxWidth:'100%'}}  className="text-white text-shadow ">SORRY, PAGE NOT FOUND! </h1>
         <a href={`${DOMAIN}`} style={{textDecoration:'none', color:'pink' }} className='btn btn-dark shadow'>BACK TO HOME  </a>
    </div>
    </div>
    )}