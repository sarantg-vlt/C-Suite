import React from 'react'
import { useNavigate } from 'react-router-dom'

const ManagementCard = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className="custom-card p-0">
            <img className="custom-card-image" src={require(``+data.img+``)} alt="Person" />
            <div className="custom-card-content">
                <h2 className="custom-card-title">{data?.name}</h2>
                <div className='custom-card-overlay'>
                <p className="custom-card-text"> • {data?.previousRole || data?.currentRole}</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button" onClick={() => navigate('/management/details', { state: { data: data } })}>Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default ManagementCard