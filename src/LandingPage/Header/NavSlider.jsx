import React,{useEffect} from 'react'
import './NavSlider.css'

import brand from './Asset/study.png';

//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'


function NavSlider() {

  //aos fatch 
  useEffect(()=>{
    Aos.init();
   },[])

  return (
    <div class="mega-box">
            <div class="content" style={{overflow:"hidden"}}>
              <div class="rows-image">
                <img src={brand} alt="" className='image-side' width={'100%'}/>
              </div>
              
              <div class="rows">
                <header>Page-first</header>
                <ul class="mega-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#what">What is LMS?</a></li>
                  <li><a href="#why">Why use LMS?</a></li>
                  <li><a href="#success">Success</a></li>
                  <li><a href="#partners">Partners</a></li>
                  <li><a href="#contact">Contact US</a></li>
                  <li><a href="#footer">Footer</a></li>
                </ul>
              </div>

              <div class="rows">
                <header>Email Services</header>
                <ul class="mega-links">
                  <li><a href="#">Personal Email</a></li>
                  <li><a href="#">Business Email</a></li>
                  <li><a href="#">Mobile Email</a></li>
                  <li><a href="#">Web Marketing</a></li>
                </ul>
              </div>

              <div class="rows">
                <header>Security services</header>
                <ul class="mega-links">
                  <li><a href="#">Site Seal</a></li>
                  <li><a href="#">VPS Hosting</a></li>
                  <li><a href="#">Privacy Seal</a></li>
                  <li><a href="#">Website design</a></li>
                </ul>
              </div>
            </div>
          </div>
  )
}

export default NavSlider