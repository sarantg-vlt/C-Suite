import React from 'react'
import "./managements.css";
import Header from '../Header/Header';
import p1 from "./Asset/panchimam.jpeg"
import { useLocation } from 'react-router-dom';


const MoreDetails = () => {
    const { data } = useLocation()?.state
    console.log(data)
    return (
        <div className='moreDetailsPage gradientArea'>
            <Header />
            <div className='details-cnt'>
                <h2 data-aos="fade-up" className='gradientText'> {data?.panel}</h2>
                <div className='management-details-cnt'>
                <img data-aos="fade-up" src={require(``+data.img+``)} alt="profile" className='details-profile-image' />
                    <div className='profile-details' >
                        <h3 data-aos="fade-left" style={{ marginBottom: "1rem" }} >{data?.name} , {data?.role}</h3>

                        <h6 data-aos="fade-left">• {data?.currentRole || data?.previousRole} </h6>
                        {
                            data?.additonalRoles && <h6 data-aos="fade-left">• {data?.additionalRoles}</h6>

                        }
                        <br />
                        <p data-aos="fade-left" style={{ textAlign: "justify" }}>
                            {data?.biography}
                        </p>
                        <br />
                        <p data-aos="fade-left" style={{ textAlign: "justify" }}>  {data?.achievements}</p>
                        <br />
                        <p data-aos="fade-left" style={{ textAlign: "justify" }}>
                            {data?.publicRecognition}
                        </p>
                        <br />
                        <p data-aos="fade-left" style={{ textAlign: "justify" }}>  {data?.professionalExperience}</p>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails