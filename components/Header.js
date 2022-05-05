import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME,DOMAIN } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';
import '../static/css/styles.css'
import {  MDBIcon } from 'mdb-react-ui-kit';
import { TelegramShareButton,} from "react-share";
import { FacebookIcon,TelegramIcon,TwitterIcon,} from "react-share";
import { FacebookShareButton, TwitterShareButton } from "react-share";

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
        <Link href={`/categories/${c.slug}`} key={i}>
            <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
        </Link>
    ));
};

  return (
    <React.Fragment>
<div style={{boxShadow:' 0px 5px 6px 0px rgba(0,0,0,0.5)'}}>

      <Navbar color="" expand="lg" style={{textTransform:'uppercase',cursor:'pointer',backgroundColor:'#6a8273',color:'white'}} >
        <Link href="/">
          <NavLink className="piggyimg" style={{display:'inline-flex'}}><img className='piggy-img' src={`${DOMAIN}/static/images/piggyproof.png`}/>  </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} > 
        <MDBIcon fas style={{color:'white'}} icon="bars" />
       
          </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className=" nbar" navbar  >
            <React.Fragment>

            <NavItem>
                <Link href="/">
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>All Blogs</NavLink>
                </Link>
                
              </NavItem>
              <NavItem>
                <Link href='/categories/trending'>
               <NavLink>  trending  </NavLink>
                </Link>
              </NavItem>
           
              <NavItem>
                <Link href={`/categories/${`piggy's-choice`}`}>
                  <NavLink>   Piggy's choice </NavLink>
                </Link>
              </NavItem>
               
             <NavItem>
                 <Link href="/search">
                 <NavLink>search <MDBIcon fas icon="search" /> </NavLink>                   
                 </Link>
                 </NavItem>
          
            </React.Fragment>

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink className='text-dark'  >{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink className='text-dark'>admin Dashboard</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signinforadmin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}

            <NavItem>

            <div className='header-icons'>
<p className='' style={{textShadow:'0px 0.4px darkblue',color:'lightblue',fontSize:'xx-small',marginTop:'6%',marginRight:'02%'}}> share</p> 
 <ul style={{listStyle:'none',margin:'0',padding:'0',display:'inline-flex'}}>
<li  >
 <TwitterShareButton  title={`${APP_NAME}`} url={`${DOMAIN}`} hashtags={["proofofpiggy", "crypto"]} >
  <TwitterIcon round  size={26}  />
  </TwitterShareButton>
  </li>
 <li>
  <FacebookShareButton   url={`${DOMAIN}`} quote={''} hashtag={"#proofofpiggy"} description={`${APP_NAME}`} >
   <FacebookIcon round size={26}  /> 
  </FacebookShareButton>
  </li>
   <li>
   <TelegramShareButton    className='' title={`${APP_NAME}`} url={`${DOMAIN}`}>
   <TelegramIcon round size={26} />
   </TelegramShareButton>
    </li>
     </ul>     
  </div>
            </NavItem>
          </Nav>

        
        </Collapse>
      </Navbar>
 </div>
    </React.Fragment>
  );
};

export default Header;