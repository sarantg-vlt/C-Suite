import React from 'react';
import './PricingPlans.css';
import { LuSparkle } from "react-icons/lu";
import { GoRocket } from "react-icons/go";

import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {

  let navigate = useNavigate();

  const makepayment = async (name, price) => {
    if(localStorage.getItem("isloggedin")==="true")
    {
      const stripe = await loadStripe("pk_test_51PUVZZRrG0ZkGYrr3y8s7r35TsoywTtRefCFB64KvnZNuuU2kotNOBp8AOZMPfyejU5Ah1DG4vXjwyig9AZXFmNv00Etljhki6");
      let data = {name:name, price:price}

      const response = await axios.post("https://sunshine-1.onrender.com/create-checkout-session",data, {
        headers: { 'Content-Type': 'application/json' }, // Set Content-Type header
      })

      console.log(response);
      
      const result = stripe.redirectToCheckout({
        sessionId:response.data.id
      });
    
      if (result.error) {
        console.log(result.error);
      }
    }
    else{
      navigate("../Authentication");
    }
  }

  return (
    <div className="background">
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between align-items-start">
          <div className="text-left">
            <h2 className="font-weight-bold  plan-title">Choose your plan</h2>
            <p className="mb-0   description-1">
            <GoRocket style={{ color: 'rgba(109, 109, 230, 1)', marginRight: '5px', fontSize:'20px'}} />

            14 days free trial
            </p>
            <p className="mb-0  text-muted description-2">Get the right plan for your business Plans can be upgraded in the future.</p>
          </div>
          <div className="d-flex align-items-center">
            <span className="mr-2">(Save 20%)</span>
            <button type="button" className="yearly-button">Yearly</button>
          </div>
        </div>
        <div className="row g-4 ">
          <div className="col-md-4 first-card">
            <div className=" custom-card">
              <div className="card-body ">
                <h5 className="card-title " style={{ color: '#1C2C83' ,fontSize: '0.90rem'}}>
                <i className="fas fa-circle mb-0 icon-glow1"></i>        Basic Plan
                </h5>
                <h6 className="card-price  font-weight-bold"><span>&#8377;</span> 499<span className="period">/ quarter year</span></h6>
                <ul className="fa-ul mt-3">
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> 2TB additional storage</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 1GB file size</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 5 projects</span></li>
                </ul>
                <button type='button' onClick={(e)=>{
                  e.preventDefault();
                  makepayment("Basic", "499")
                }} className="plan-button mt-auto">Get Plan</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 second-card">
            <div className="  custom-card">
              <div className="card-body">
                <h5 className="card-title " style={{ color: '#4271BA' , fontSize: '0.90rem'}}>
                <i className="fas fa-circle mb-0 icon-glow2"></i>                  Standard Plan
                </h5>
                <h6 className="card-price "><span>&#8377;</span> 999 <span className="period">/ half year</span></h6>
                <ul className="fa-ul mt-3">
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> 2TB additional storage</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 1GB file size</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 5 projects</span></li>
                </ul>
                <button type='button' onClick={(e)=>{
                  e.preventDefault();
                  makepayment("Standard", "999")
                }} className="plan-button mt-auto">Get Plan</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 third-card">
            <div className=" custom-card">
              <div className="card-body ">
                <h5 className="card-title " style={{ color:'#4A00C2',fontSize: '0.90rem' }}>
                <i className="fas fa-circle mb-0 icon-glow3"></i>                  Premium Plan
                </h5>
                <h6 className="card-price"><span>&#8377;</span> 1999 <span className="period">/ one year</span></h6>
                <ul className="fa-ul mt-3">
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> 2TB additional storage</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 1GB file size</span></li>
                  <li><span className="fa-li"><LuSparkle style={{ fill: 'rgba(239, 151, 19, 1)', color:'rgba(239, 151, 19, 1)'}} /> Up to 5 projects</span></li>
                </ul>
                <button type='button' onClick={(e)=>{
                  e.preventDefault();
                  makepayment("Premium", "1999")
                }} className="plan-button mt-auto">Get Plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
