import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import ScrollMenu from 'react-horizontal-scroll-menu';
import { getCategories } from './../actions/category';
import '../static/css/styles.css';


const CategoryMenu = ({  router}) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        initCategories();
    }, [router]);


    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn  mr-1 ml-1 mt-2 mb-2" style={{border:'none',boxShadow:'none',color:'#6a8273'}}><b className='fonts'>{c.name}</b></a>
            </Link>
        ));
    };

    const Arrow = ({ text, className }) => {
        return (
          <div style={{backgroundColor:'',padding:'0',margin:'0'}}
            className={className}
          ><MDBIcon fas icon={text} style={{color:'#6a8273'}} /></div>
        );
      };
       
      const ArrowLeft = Arrow({ text: 'chevron-circle-left', className: 'arrow-prev' });
      const ArrowRight = Arrow({ text: 'chevron-circle-right', className: 'arrow-next' });

    return (
        <React.Fragment>
            <div className='text-center  p-1 shadow '> 
            <ScrollMenu
           data={showAllCategories()}
           arrowLeft={ArrowLeft}
           arrowRight={ArrowRight}
           scrollBy={1}
           arrowDisabledClass="scroll-menu-arrow--disabled"
           innerWrapperClass='menu-wrapper--inner'
           itemClassActive={false}
           alignCenter={false}
           />
         </div>
        </React.Fragment>
    );
};



export default withRouter(CategoryMenu);