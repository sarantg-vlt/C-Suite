import React from 'react'
import ELA from './ELA'
import './ela.css'
import LeftBar from '../sidebar/LeftBar'

const ELApage = () => {
  return (
    <div className="courses-page">
      <LeftBar />
      <ELA/>
    </div>
  )
}

export default ELApage