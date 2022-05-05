

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';

import { singleAdd, updateAdd } from '../../actions/recommended';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config'; 

const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 


const RecommendedUpdate = ({ router }) => {
    const [body, setBody] = useState('');



    const [values, setValues] = useState({
        title: '',     
        addimg:'',
        addLink :'',
        expdate: '', 
        error: '',
        success: '',
        formData: '',
      //  title: '',
        body: ''
    });

    const { error, success, formData, title ,     
        addimg,
        addLink ,
        expdate} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initAdd();
   
        handleBody();
    }, [router]);

    const initAdd = () => {
        if (router.query.slug) {
            singleAdd(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title,    
                        addimg:data.addimg,
                        addLink :data.addLink,
                        expdate: data.expdate});
                    setBody(data.body);
                
                }
            });
        }
    };



  


    const handleChange =( name )=> (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
       //formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = (e) => {
        let formData = new FormData();
        setBody(e);
        formData.set("body", e);
      };
     
      const editAdd = (e) => {
        e.preventDefault();
       // let formData = new FormData();
        formData.append("title", values.title);
        formData.append("addLink", values.addLink);
        formData.append("addimg", values.addimg);
        formData.append("expdate", values.expdate);
        formData.append("body", body);
       // formData.append("categories", values.categories);
        updateAdd(formData, token, router.query.slug).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              title: "", addimg:'',
              addLink :'',
              expdate: '', 
              success: `Blog title ${data.title} is successfully updates`,
            });
            if (isAuth() && isAuth().role === 1) {
              Router.replace(`/admin/crud/recommended/${router.query.slug}`);
            } else if (isAuth() && isAuth().role === 0) {
              Router.replace(`/user/crud/recommended/${router.query.slug}`);
            }
          }
        });
      };
     

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const updateAddForm = () => {
        return (
            <form onSubmit={editAdd}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Link (optional)
                    <br/> <p className='text-warning small p-0'  > If you want to make add page add : <b> recomendeds/</b> than add title but insted of space betveen letters add -</p>
                    </label>
                    <input type="text" className="form-control" value={addLink} onChange={handleChange('addLink')} />
                </div>
               
                <div className="form-group">
                    <label className="text-muted">Exp date (optional)</label>
                    <input type="date" className="form-control" value={expdate} onChange={handleChange('expdate')} />
                </div>
                <div className="form-group">
            
  <SunEditor
              setOptions={{
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                    ['save', 'template']
                  ],
                  
      minHeight: 400
              }}
    
                      setContents={body}
                          placeholder="Write something amazing..."
                          onChange={handleBody}
                    />

                </div>

                <div>
                    <button type="submit" className="btn btn-secondary col-md-4">
                        Update
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateAddForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

         
           
                    <input type="text" className="form-control" value={addimg} onChange={handleChange('addimg')} />
             
                        
                        </div>

                    {body && (addimg ===null ?  'bala':
                        <img src={addimg} alt={title} style={{ width: '90%' }} />
                    )}        <p className='text-warning small'>If you add image link and you picture is not show here your link is probabli is not good! </p>
                    </div>
                    <br/>
                  
                </div>
            </div>
        </div>
    );
};

export default withRouter(RecommendedUpdate);