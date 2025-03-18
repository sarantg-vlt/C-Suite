import React,{useEffect} from 'react'

//style.css imported
import './landingpage.css'

//react-router-dom
import { PiStudent } from "react-icons/pi";

//imported in header components
import Header from '../Header/Header';

//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom';

const Landingpage = () => {
  
  //aos fatch 
  useEffect(()=>{
     Aos.init();
  },[])

  return (
    <>
      <div className="landing-page" id='home'>
        <Header/>
        <section className="hero-section" >
          <div className="container-landing-text">
            {/* <div className='text-learn' data-aos="fade-down" data-aos-duration="3000">
              <PiStudent size='2.5rem' />
              <p>Learn more</p>
            </div> */}
            <p className='text-grow'  data-aos="zoom-in-up"  data-aos-duration="1000">On average CXOs earn 14X, more</p>
            <p className='text-build'  data-aos="zoom-in-up"  data-aos-duration="2000">than Top-performers</p>
            <p className='text-course-development'  data-aos="zoom-in-up"  data-aos-duration="3000">Only 3% of Top-performers make it to the C-suite.</p>
            <div data-aos="fade-up"
            data-aos-duration="3000">
              <Link to={'./authentication'}>
              <button type="button" className="button-unlock" >Unlock Your Potential</button>
              </Link>
            </div>
             
          </div>
        </section>
      </div>  
    </>
  )
}

export default Landingpage