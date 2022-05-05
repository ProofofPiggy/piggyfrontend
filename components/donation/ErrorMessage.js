import Link from 'next/dist/client/link';

export default function ErrorMessage({ message }) {
  if (!message) return (
 <Link  href='/about-us' >
      <a  className='text-dark p-0 m-0' style={{opacity:'60%',textDecoration:'none',fontSize:'small'}}>
        More donation option
        </a>
        </Link>
       );

  return (
    <div className=" ">
      <div style={{fontSize:'small'}}>
  
       {message}
      </div>
    </div>
  );
}
