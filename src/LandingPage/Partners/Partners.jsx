import React,{useEffect} from 'react'

//style.css
import './Partners.css'

//imported react icons
import { FaArrowRight } from "react-icons/fa6";
import { ImAndroid } from "react-icons/im";
import { ImStatsBars } from "react-icons/im";
import { SiSololearn } from "react-icons/si";


//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'

function Partners() {

    //aos fatch 
    useEffect(()=>{
        Aos.init();
    },[])    
  return (
    <div className='Partners' id='partners'>
        <div className="curve"></div>
        <div className="parent">
            <div className='subparent'>
                <h2>Empower educators with seamless development from course creation to delivery</h2>
                <p>Forge partnerships that align with your educational goals, ensuring a  smooth transition from course creation to delivery, whether on local  servers or in the cloud.</p>
                <div  data-aos="fade-up">
                <h4  style={{cursor:'pointer'}}>Our trusted partners <FaArrowRight size='1.2rem'/></h4>
                </div>
                <div className="partnerscontainer">
                    <div data-aos="fade-up" className='partneritems'>
                        <div className='img p-3'><ImAndroid size='3rem'/></div>
                        <p>An online learning marketplace offering a diverse array of  courses across various subjects.</p>
                    </div>
                    <div data-aos="fade-up" className='partneritems'>
                    <div className='img p-3'><ImStatsBars size='3rem'/></div>
                        <p>A platform providing professional courses, certifications,  and personalized mentorship to enhance career.</p>
                    </div>
                    <div data-aos="fade-up" className='partneritems'>
                    <div className='img p-3'><SiSololearn size='3rem'/></div>
                        <p>A learning management system facilitating intuitive course  design, interactive content creation.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Partners