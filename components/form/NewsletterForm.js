import { useState } from 'react';
import { decode } from 'html-entities';

const NewsletterForm = ( { status, message, onValidated }) => {

  const [ error, setError ] = useState(null);
  const [ email, setEmail ] = useState(null);
const [fill,setFill]=useState('Terms of use and privacy policy');
  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
setFill('')
    setError(null);

    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = ( event ) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if ( !message ) {
     return null;
    }
    const result = message?.split('-') ?? null;
    if ( "0" !== result?.[0]?.trim() ) {
     return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode( formattedMessage ) : null;
  }

  return (
    <>
    <div style={{backgroundColor:'',justifyContent:'center'}} className='p-2'>

    
  
      <div className="d-flex newsletter-input-fields col-md-12 ">
        
        <div className="mc-field-group">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="Your email"
            className=" form-control " 
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </div>
        <div className="button-wrap wp-block-button">
          <button  className="btn  submit-button focus:ring focus:outline-none w-full ml-1"  style={{backgroundColor:'',color:'white'}} onClick={handleFormSubmit}>
            Subscribe
          </button>
        </div>
      </div>
      <div className="newsletter-form-info ">
   
{fill && <div className='' style={{fontSize:'small'}}> {fill}</div>}
        {status === "sending" && <div style={{fontSize:'small'}}>Sending...</div>}
        {status === "error" || error ? (
          <div style={{fontSize:'small'}}
            className="newsletter-form-error"
            dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
          />
        ) : null }
      {status === "success" && status !== "error" && !error && (
          <div style={{fontSize:'small'}}  dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div></div>
    </>
  );
}

export default NewsletterForm