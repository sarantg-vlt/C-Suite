import React,{useEffect} from 'react'
import './Overlaycards.css';

import img1 from './Assets/1.jpg'
import img2 from './Assets/2.jpg'
import img3 from './Assets/images.jpeg.jpg'

//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'


const Overlaycards = () => {
  //aos fatch 
  useEffect(()=>{
    Aos.init();
   },[])

  return (
    <div className='Overlaycards'>
    <div class="container">
          <div  class="card  p-3">
            <div>
              <img className='card-img' src={img1}/>
              <h1 className='card-head-txt ms-1'>Cameron Willamson</h1>
              <p className='card-subhead-txt ms-1 '><u>Graphic designer</u></p>
              <p style={{ marginTop: '5px' }} className='card-text ms-1'>No design works unless it embodies ideas held common by the people</p>
            </div>
            
          </div>
          <div class="card card-2 p-2">
            <div>
              <img className='card-img' src={img2}/>
              <h1 className='card-head-txt ms-1'>Peiterson kevin</h1>
              <p className='card-subhead-txt ms-1 '><u>Back-end Developer</u></p>
              <p style={{ marginTop: '5px' }} className='card-text ms-1'>To market yourself effectively as a software developer</p>
            </div>
            
          </div>
          <div class="card card-3 p-2">
            <div>
              <img className='card-3-img' src={img3}/>
              <h1 className='card-head-txt ms-1'>Keserik rathini</h1>
              <p  className='card-subhead-txt ms-1  '><u >Java Developer</u></p>
              <p style={{ marginTop: '5px' }} className='card-text ms-1'>hello how are you i am fine here this is a random text to just text the front page</p>
            </div>
            {/* <div>
            <p className='card-country-txt'>London,UK</p>
            <p className='card-txt-course'>Course </p>
            <p className='card-txt-instructor'>Instructor </p>
            </div> */}
          </div>
        </div>
    
 
    </div>
    
  )
}

export default Overlaycards