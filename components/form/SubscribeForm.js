import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';
import { NEXT_PUBLIC_MAILCHIMP_URL} from '../../config';

const NewsletterSubscribe = () => {

  const MAILCHIMP_URL = NEXT_PUBLIC_MAILCHIMP_URL;

  return (<>
<div className=' ' style={{width:'auto',display:'grid',justifyContent:'center',alignItems:'center',textAlign:'center'}}>

    <MailchimpSubscribe
      url={ MAILCHIMP_URL }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
          status={ status }
          message={ message }
          onValidated={ formData => subscribe( formData ) }
          />
          );
        } }
        />
        </div>
</>
  );
};
export default NewsletterSubscribe;