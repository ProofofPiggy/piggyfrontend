import Header from './Header';
import React from 'react';
import Footer from './Footer';
import Link from 'next/link';
import CookieConsent from "react-cookie-consent";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
     <CookieConsent   style={{backgroundColor:'#354139',opacity:'80%',cursor:'pointer',textAlign:'center'}}
        buttonText="Understand and accept"
        buttonStyle={{backgroundColor:'#354139',opacity:'100%',color:'white',border:"white solid 1px"}}
        expires={1} >
        We use cookies to improve your experience on our site.
        For more information read our <Link  href='/termsofuseandprivacypolicy'><b >Terms of Use and Privacy Policy </b></Link>.
      </CookieConsent>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;
