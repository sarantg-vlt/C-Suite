import React, { useEffect } from 'react';
import './FindPricing.css';
import Aos from "aos"
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom';

function FindPricing() {

  useEffect(()=>{
    Aos.init();
  },[])


  return (
    <div className='FindPricing'>
      <div className="container">
        <div className="leftcontainer" data-aos="fade-right">
          <h1>Choose a course that's right for you</h1>
          <p>Find your perfect balance of collaboration, security, and support by collabrating with C-suite Academy.</p>
        </div>
        <div className="rightcontainer" data-aos="fade-left">
          <Link to="/authentication"><button>Click here</button></Link>
        </div>
      </div>
    </div>
  );
}

export default FindPricing;