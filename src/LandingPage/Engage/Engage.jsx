import React, {useEffect} from 'react'

import './engage.css'

import { FaArrowRight } from "react-icons/fa6";

//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'

const Engage = () => {

  //aos fatch 
  useEffect(()=>{
    Aos.init();
  },[])

      
  return (
    <>
     <div className='engage-head'>
        <h2 data-aos="fade-up">Engage</h2>
        <h3>Join the educational community</h3>
        <p className='engage-para'>Participate in regional workshops or connect virtually through our<br/> dedicated forums and chat platforms.
         Our LMS experts provide <br/>valuable insights and support to enhance your teaching experience<br/> and professional development.</p>
        <div data-aos="fade-up">
        <h4 >Connect with us <FaArrowRight  size='1.2rem'/></h4>
        </div>
        <p className='engage-para-two'>Join our open source initiative</p>
        <p className='our-lms-supporet'>Our LMS-Supported Open Source program welcomes <br/>developers contributing to non-commercial projects in the <br/> education sector.</p>
        
        <div data-aos="fade-up">
         <h4>Apply Now <FaArrowRight size='1.2rem'/></h4>
        </div>
     </div>
    </>
  )
}

export default Engage