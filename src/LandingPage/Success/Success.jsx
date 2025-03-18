import React,{useEffect} from 'react'

import './success.css'

//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'

import inner from './Assets/inner.png'
function Success() {

    //aos fatch 
    useEffect(()=>{
      Aos.init();
    },[])

  return (
    <>
      
      <div className='container-fluid' id='success'>
        <div className='row'>
          <div className='col-md-7 center-all' data-aos="fade-right">
            <div className='content-head '>
              <h2>Your Success Matters</h2>
              <p>Our learning technology is designed to propel you beyond your goals effortlessly. 
                From our user experience design to our unwavering support, the Absorb team handles the heavy lifting,
                allowing your learners to excel, your administrators to relax, and your business to outperform the competition.
                We excel at simplifying the complex, but we'll keep that just between us.
                Experience it firsthand and see for yourself.</p>
            </div>
          </div>
          <div data-aos="fade-left" className='col-md-5' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className='outer-image'>
              <img src={inner} className='inner-image'/>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}

export default Success