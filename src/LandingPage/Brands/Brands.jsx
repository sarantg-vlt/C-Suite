import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './brands.css';

// Import your logos with brandone
// import ADP from './Assets/adp-logo.svg';
import Ataccama from './Assets/ataccama-logo.svg';
import Bastion from './Assets/bastion-zero-logo.png';
import Cariad from './Assets/cariad-logo.svg';
import CoxAutomotive from './Assets/cox-automotive-logo.svg';
import Confluent from './Assets/confluent-logo.svg';
import Expedia from './Assets/expedia-logo.svg';
import Infosys from './Assets/infosys-logo.svg';
import Ing from './Assets/ing-logo.svg';
// import Spotify from './Assets/spotify-logo.png';

// Import your logos with brandtwo
// import pinterest from './Assets/pinterest-badge.svg';
// import rakuten from './Assets/rakuten-logo.svg';
// import salt from './Assets/salt-security-logo.svg';
// import warehouse from './Assets/the-warehouse-group-logo.svg';
// import trade from './Assets/trade-republic-logo.svg';
// import zeiss from './Assets/zeiss-logo.svg';
// import onemain from './Assets/onemain-vertical.svg';
// import nytimes from './Assets/nytimes-rectangle-logo.svg';
// import player from './Assets/jw-player-logo.svg';
// import tabcorp from './Assets/tabcorp-logo.svg';


// new import
import bevywise from "./Assets/bevy.png";
import yes from "./Assets/yes.png";
import msubbu from "./Assets/msubbu.png";
import kriscon from "./Assets/kriscon.jpg";
import procrama from "./Assets/procrama.jpg";
import planpoint from "./Assets/planpoint.png";
import vlt from "./Assets/vlt.jpg";
import parisu from "./Assets/parisu.jpg";
import trilliom from "./Assets/trillom.png";
// new import






//Aos animations
import Aos from "aos"
import 'aos/dist/aos.css'


const data = {
  brandone: [
    { name: "beywise", src: bevywise },
    { name: "yes", src: yes },
    { name: "msubbu", src: msubbu },
    { name: "procrama", src: procrama },
    { name: "planpoint", src: planpoint },
    { name: "vlt", src: vlt },
    { name: "kriscon", src: kriscon },

    { name: "parisu", src: parisu },
    { name: "trilliom", src: trilliom },
    // { name: "Spotify", src: Spotify },
    // { name: "Pinterest", src: pinterest },
    // { name: "Rakuten", src: rakuten },
    // { name: "Salt Security", src: salt },
    // { name: "Trade Republic", src: trade },
    // { name: "The Warehouse Group", src: warehouse },
    // { name: "Zeiss", src: zeiss },
    // { name: "JW Player", src: player },
    // { name: "New York Times", src: nytimes },
    // { name: "Tabcorp", src: tabcorp },
    // { name: "OneMain", src: onemain },
  ],

  stats: {
    users: "15",
    instructors: "10",
    courses: "20",
  },
};

const Brands = () => {

  //aos fatch 
  useEffect(() => {
    Aos.init();
  }, [])


  const { ref: usersRef, inView: usersInView } = useInView();
  const { ref: instructorsRef, inView: instructorsInView } = useInView();
  const { ref: coursesRef, inView: coursesInView } = useInView();

  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.logos-container');
    const wrapper = document.querySelector('.logos-wrapper');

    // Clone the content to create a seamless scroll effect
    const clone = wrapper.cloneNode(true);
    container.appendChild(clone);

    function startScrolling() {
      let pos = 0;
      const step = 1; // Adjust the speed of the scroll

      function scroll() {
        pos -= step;
        if (pos <= -wrapper.clientHeight) {
          pos = 0;
        }
        container.scrollTo(0, pos);
        requestAnimationFrame(scroll);
      }

      requestAnimationFrame(scroll);
    }

    startScrolling();
  });



  return (
    <div className='container-fluid' id='why'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='lms-info'>
            <h1 className='why-lms'>Do I really, need C-Suite <br />coaching?</h1>
            {/* <h3 className='why-para-one'>Preferred by educators worldwide.<br /> Adopted by leading educational institutions.</h3> */}
            <p className='why-para-two'>
              In an average large enterprise, there are about 10,000 employees. Of whom:
              <ul >
                <li>200 to 300 are considered as High Performers.</li>
                <li>Only 5 to 10 have true strategic authority, i.e., CXOs.</li>
              </ul>
              <ul>
                <li>Most High Performers never make it as CXOs in their career, despite topping all performance metrics.</li>
                <li>To be a CXO, your employer needs to be Irreplaceably Dependent on you.</li>
                <li>To be Irreplaceably Dependent, you must constantly deliver company-wide contributions.</li>
                <li>This work style is not taught in B-schools or company training; it requires special coaching and mentorship.</li>
              </ul>
            </p>
          </div>

          {/* <div className='stats-container'>
            <div className='stat-item'>
              <strong ref={usersRef}>
                {usersInView && <CountUp end={data.stats.users} duration={2} separator="," />}M+
              </strong>
              <p className='para-tool'>USERS</p>
            </div>
            <div className='stat-item'>
              <strong ref={instructorsRef}>
                {instructorsInView && <CountUp end={data.stats.instructors} duration={2} separator="," />}M+
              </strong>
              <p className='para-tool'>INSTRUCTORS</p>
            </div>
            <div className='stat-item'>
              <strong ref={coursesRef}>
                {coursesInView && <CountUp end={data.stats.courses} duration={2} separator="," />}B+
              </strong>
              <p className='para-tool'>COURSES</p>
            </div>
          </div> */}
        </div>

        <div className='col-md-5'>
          <div className="logos-container">
            <div className="logos-wrapper">
              <div className="logos-content">
                {data.brandone.map((logo, index) => (
                  <div data-aos="fade-left"
                    data-aos-easing="linear"
                    data-aos-duration="1500" key={index} className="logo-item">
                    <img src={logo.src} alt={logo.name} className="logo-image" />
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;

