import React,{useState,useEffect} from 'react';
import { list } from '../actions/recommended';
import { Zoom,Fade,Slide } from 'react-slideshow-image';
import Link from 'next/link';
import 'react-slideshow-image/dist/styles.css';

const RecommendedSlider = () => {

 

    const [adds, setAdds] = useState([]);
    useEffect(() => {
        loadAdds();
    }, []);

    const loadAdds = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setAdds(data);
            }
        });
    };


  const zoomInProperties = {
    indicators: true,
    arrows:false,
  }
 

    return (
        <div>
    <div  style={{justifyContent:'center',textAlign:'center',alignContent:'center',alignItems:'center',padding:'0 ',width:'100%'}}   >
      <Slide easing="ease" {...zoomInProperties}>
        {adds.map((a,i) => (
        
          <div key={i} style={{width: "100%",maxHeight:'450px',display:'flex',alignItems:'center',justifyContent:'center',}}>
           <a href={a.addLink}  target='_blank'> 

            <img style={{//width: "1680px",maxHeight:'500px',
            objectFit: "cover" ,width:'100%' }} src={a.addimg} />
           </a>
          </div>
        ))}
      </Slide>
    </div>
          
        </div>
    );
};




export default RecommendedSlider;