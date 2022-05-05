import Link from 'next/link';
import { Input } from 'reactstrap';

import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';

import { createAdd } from '../../actions/recommended';


const SunEditor = dynamic(() => import('suneditor-react'), {ssr: false})
import '../../node_modules/suneditor/dist/css/suneditor.min.css'; 


const RecommendedAdd = ({ router }) => {
    const addFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('add')) {
            return JSON.parse(localStorage.getItem('add'));
        } else {
            return false;
        }
    };



    const [body, setBody] = useState(addFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',  
        addimg:'',
        addLink:'',
        expdate: '', 
        photo:'',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, addimg,addLink,expdate,hidePublishButton ,photo} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });

    }, [router]);


    const publishAdd = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
       
 

        createAdd(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: null, success: `A new add titled "${data.title}" is created` });
                setBody('');
              
            }
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        //let formData = new formData();
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('add', JSON.stringify(e));
        }
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

    const createAddForm = () => {
        return (
            <form onSubmit={publishAdd}>
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
                    <button type="submit" className="btn btn-dark">
                        Publish
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5 pt-2">
            <div className="row">
                <div className="col-md-8">
                    {createAddForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <input type="text" className="form-control" value={addimg} onChange={handleChange('addimg')} placeholder='image link' />
                        </div>
                    </div>{ addimg ? 
                    <img src={addimg} alt={title} style={{ width: '100%' }} />:
                    <p className='text-warning small'>If you add image link and you picture is not show here your link is probabli is not good! </p>
                }
                   
                </div>
            </div>
        </div>
    );
};

export default withRouter(RecommendedAdd);