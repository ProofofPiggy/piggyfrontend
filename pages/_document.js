
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Document, { Html, Head, Main, NextScript } from 'next/document';
import CookieConsent from "react-cookie-consent";
import './../static/css/styles.css';
import getConfig from 'next/config';
const {publicRuntimeConfig}=getConfig();

export default class MyDocument extends  Document {

setGoogleTags(){
  if(publicRuntimeConfig.PRODUCTION){
    return{
      __html:`
      window.dataLayer = window.dataLayer || [];
      function gtag () {dataLayer.push (arguments);}
      gtag ('js', new Date ());
    
      gtag ('config', 'G-6KLHV1CDBJ');
      `
    }
  }
}


static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
    render() {
        return (
            <Html>
                <Head>
                <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"/>
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
       
        <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7_dtp.css" rel="stylesheet" type="text/css"/>

          <script type="text/javascript" src="http://connect.facebook.net/en_US/all.js"></script>
  
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9317053946095659" crossorigin="anonymous"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-6KLHV1CDBJ"></script>
  
   <script  dangerouslySetInnerHTML={this.setGoogleTags()}  ></script>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </ Html>
        );
    }
}