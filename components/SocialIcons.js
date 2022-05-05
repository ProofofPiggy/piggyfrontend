import React,{useState,useEffect} from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/dist/client/link';
import './../static/css/styles.css'

import { getIcons } from '../actions/icon';

export default function SocialIcons() {
  const [values, setValues] = useState({
    name: '',
    iconLink:'',
   iconCode:'',
   icons: [],
  
});

const { name,icons,iconLink,iconCode} = values;
useEffect(() => {
    loadIcons();
}, []);

const loadIcons = () => {
    getIcons().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setValues({ ...values,icons: data });
        }
    });
};

return (

<div>
{icons.length === 0 ? null : <h5 className='pb-2  text-white text-shadow'>FOLOW US</h5> }
<ul className='list-unstyled mb-2' style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              {icons.map((ic,i)=>(
              <li key={i}>
              <a href={ic.iconLink} target='_blank' style={{textDecoration:'none',opacity:'70%'}} className='icon-shadow text-dark'  >
                <MDBIcon fab icon={ic.iconCode} className='m-2 zoom-box' size='2x' />
                </a>
              </li> ))}  </ul>

</div>
);}