  
import React, { useEffect } from "react";

const AdBanner = () => {
 // useEffect(() => {
   // try {
  //    (window.adsbygoogle = window.adsbygoogle || []).push({});
  //  } catch (err) {
    //  console.log(err);
   // }
 // }, []);

// useEffect(() => {
 //// var ads = document.getElementsByClassName("adsbygoogle").length;
 /// for (var i = 0; i < ads; i++) {
   // try {
  //    (adsbygoogle = window.adsbygoogle || []).push({});
 //   } catch (e) { }
//  }
//}, []);
useEffect(() => {
   try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
  console.log(err);
   }
  }, []);



  return (
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9317053946095659"
     data-ad-slot="4867291055"
     data-ad-format="auto"
     data-full-width-responsive="true"
     data-adtest="true"
     />
  );
};

export default AdBanner;