import React from 'react'
import './learning.css'
import ArrowRight from '../Asset/arrow-right.png'
import Circle from '../Asset/circle.png'
import Manager from '../Asset/manager.png'
import Online from '../Asset/online.png'
import Payment from '../Asset/payment.png'
import Lecture from '../Asset/lecture.png'
import Step1 from '../Asset/LJ-step-1.svg'
import Step2 from '../Asset/LJ-step-2.svg'
import Step3 from '../Asset/LJ-step-3.svg'
import Step4 from '../Asset/LJ-step-4.svg'


const LearningJourney = () => {
    return (
        <div className='learning-journey-cnt'>
            <h4 className=''>Joining Process</h4>
            <div className='journey-cnt-lg'>
                <div className='element-flex-cnt'>
                    <div className='nav-line-sm'>
                        <img src={Circle} alt="circle" className='line-img' />
                        <img src={ArrowRight} alt="circle" className='line-img-arrow straight-arrow' />
                    </div>
                    <div className='element-cnt device-lg' data-aos="fade-right" >
                        <img src={Manager} alt="icon" className='element-icon' />
                        <p className='text-value'>Choose course</p>
                    </div>
                </div>
                <div className='element-flex-cnt'>
                    <div className='nav-line-sm'>
                        <div></div>
                        <img src={ArrowRight} alt="circle" className='line-img-arrow straight-arrow' />
                    </div>
                    <div className='element-cnt device-lg' data-aos="fade-right" >
                        <img src={Online} alt="icon" className='element-icon' />
                        <p className='text-value'>Take Assessment</p>
                    </div>
                </div>
                <div className='element-flex-cnt'>
                    <div className='nav-line-sm'>
                        <div></div>
                        <img src={ArrowRight} alt="circle" className='line-img-arrow straight-arrow' />
                    </div>
                    <div className='element-cnt device-lg' data-aos="fade-right" >
                        <img src={Payment} alt="icon" className='element-icon' />
                        <p className='text-value'>Post qualifying</p>
                    </div>
                </div>
                <div className='element-flex-cnt'>
                    <div className='nav-line-sm'>
                        <div></div>
                        <img src={ArrowRight} alt="circle" className='line-img-arrow straight-arrow' />
                    </div>
                    <div className='element-cnt device-lg' data-aos="fade-right" >
                        <img src={Lecture} alt="icon" className='element-icon' />
                        <p className='text-value'>Start Learning</p>
                    </div>
                </div>
            </div>
            <div className='joining-process-cnt'>
                <h4 className=''></h4>
                <div className='nav-line'>
                    <img src={Circle} alt="circle" className='line-img' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                </div>
                <div className='nav-element-cnt'>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Manager} alt="icon" className='element-icon' />
                        <p className='text-value'>Choose course</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Online} alt="icon" className='element-icon' />
                        <p className='text-value'>Take Assessment</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Payment} alt="icon" className='element-icon' />
                        <p className='text-value'>Post qualifying</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Lecture} alt="icon" className='element-icon' />
                        <p className='text-value'>Start Learning</p>
                    </div>
                </div>
            </div>
            <div className='journey-box'>
                <h4 className='bold-text'> <span >Learning </span>Journey</h4>
                <div className='journey-elements-cnt'>
                    <div className='journey-steps-icons'>
                        <img src={Step1} data-aos="fade-down" alt="step-1" className='steps-svg' />
                        <img src={Step2} data-aos="fade-down" alt="step-1" className='steps-svg' style={{ top: "7rem" }} />
                        <img src={Step3} data-aos="fade-down" alt="step-1" className='steps-svg' style={{ bottom: "9rem" }} />
                        <img src={Step4} data-aos="fade-down" alt="step-1" className='steps-svg' style={{ bottom: '3rem' }} />
                    </div>
                    <div className='journey-steps'>
                        <div className='top-steps-cnt'>
                            <div className='half-steps-cnt'>
                                <div className='steps-line' />
                                <div className='absolute-steps-cnt'>
                                    <div className='journey-step'>
                                        <p>Self-Paced learning for 45 hours</p>
                                    </div>
                                    <div className='journey-step cross-radius' style={{ marginTop: "2rem" }}>
                                        <p>Complete online Assessment</p>
                                    </div>
                                </div>
                            </div>
                            <div className='half-steps-cnt'>
                                <div className='steps-line' />
                                <div className='absolute-steps-cnt'>
                                    <div className='journey-step cross-radius'>
                                        <p>Connect to tutors online</p>
                                    </div>
                                    <div className='journey-step' style={{ marginTop: "2rem" }}>
                                        <p>Virtual meetings with experts at weekly once</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-steps-cnt'>
                            <div className='bottom-line' />
                            <div className='bottom-steps'>
                                <div className='bottom-step'>
                                    <p>Attend virtual interview with C-SUITE panel</p>
                                </div>
                                <div className='bottom-step  bottom-radius'>
                                    <p>Get Certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningJourney