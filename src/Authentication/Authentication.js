import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { json, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import './Authentication.css';

import logo from './Assets/brand-1.png'
import carousel1 from './Assets/image1.png'
import carousel2 from './Assets/image2.png'
import carousel3 from './Assets/image3.png'

function Authentication() {

  useEffect(()=>{
    if(localStorage.getItem("isloggedin")==="true"){
      if(localStorage.getItem("elacomplete")==="false"){
        navigate("../quick-assessment");
      }
      else{
        navigate("../home");
      }
    }
  },[])

  const navigate = useNavigate();

    let [mode, setmode] = useState("")

    function togglemode(){
        if(mode==""){
            setmode("sign-up-mode");
        }
        else{
            setmode("");
        }
    }

    const inputs = document.querySelectorAll(".input-field");
    const main = document.querySelector("main");
    const bullets = document.querySelectorAll(".bullets span");
    const images = document.querySelectorAll(".image");

    inputs.forEach((inp) => {
        inp.addEventListener("focus", () => {
          inp.classList.add("active");
        });
        inp.addEventListener("blur", () => {
          if (inp.value != "") return;
          inp.classList.remove("active");
        });
      });

    function moveSlider() {
        let index = this.dataset.value;
      
        let currentImage = document.querySelector(`.img-${index}`);
        images.forEach((img) => img.classList.remove("show"));
        currentImage.classList.add("show");
      
        const textSlider = document.querySelector(".text-group");
        textSlider.style.transform = `translateY(${-(index - 1) * 2.5}rem)`;
      
        bullets.forEach((bull) => bull.classList.remove("active"));
        this.classList.add("active");

        console.log(index)
      }
      
      bullets.forEach((bullet) => {
        bullet.addEventListener("click", moveSlider);
      });

      const [loginemail, setLoginEmail] = useState('');
      const [loginpassword, setLoginPassword] = useState('');

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');      
      const [confPassword, setConfPassword] = useState('');
      const [linkedin, setLinkedin] = useState('');

      async function handlesignin() {
        try {
          const response = await axios.get('https://c-suite-academy-2.onrender.com/check', {
            params: {
              email: loginemail, // Can be email or username
            },
          });
      
          if (response.data === "null") {
            toast.error("Account not found!");
            return;
          }
      
          const user = JSON.parse(response.data);
      
          if (user.password === loginpassword) {
            toast.success("Login Successful!");
      
            // Check user type and handle navigation
            if (user.type === "user") {
              localStorage.setItem("isloggedin", true);
              localStorage.setItem("userid", user._id);
              localStorage.setItem("name", user.name);
              localStorage.setItem("email", user.email);
              localStorage.setItem("linkedin", user.linkedin);
              localStorage.setItem("elacomplete", user.elacomplete);
      
              if (!user.elacomplete) {
                setTimeout(() => {
                  navigate("../quick-assessment");
                }, 5000);
              } else {
                setTimeout(() => {
                  navigate("../home");
                }, 5000);
              }
            } else if (user.type === "admin") {
              toast.success("Welcome Admin!");
              localStorage.setItem("isloggedin", true);
              localStorage.setItem("adminid", user._id);
              localStorage.setItem("email", user.email);
              navigate("../admin"); // Navigate to admin dashboard
            } else {
              toast.error("Invalid user type!");
            }
          } else {
            toast.error("Incorrect password!");
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while signing in!");
        }
      }
      

      async function handlesignup(){
        if(password==confPassword){
          let data =  {name:name, email:email, linkedin:linkedin, password:password };
        try {
          const response = await axios.get('https://c-suite-academy-2.onrender.com/check', {
            params: {
              email: email,
            },});
          console.log(response.data);
          if(response.data=="null"){
            try {
              const response = await axios.post('https://c-suite-academy-2.onrender.com/signup', data, {
                headers: { 'Content-Type': 'application/json' }, // Set Content-Type header
              });
              console.log(response.data);
              toast.success("Signup Successfull!")
              setTimeout(() => {
                togglemode()
              }, 5000);
               // Handle successful response (optional)
            } catch (error) {
              console.error(error); // Handle errors
            }
          }
          else{
            toast.error("Email Already Exist!")
          }
        } catch (error) {
          console.error(error); // Handle errors
        }
        }
        else{
          toast.error("Password and Confirm Password Does not Match!")
        }

      };

  return (
    <div className='Authentication'>
      <ToastContainer />
        <main className={mode}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form autocomplete="off" className="sign-in-form"  onSubmit={(e)=>{
              e.preventDefault()
              handlesignin()
              }}>
              <div className="logo">
                <img src={logo} alt="easyclassName" />
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registred yet? <a className="toggle" onClick={(e)=>{
                    e.preventDefault();
                    togglemode();
                }}>Sign up</a></h6>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=>setLoginEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=>setLoginPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <button type="submit" value="Sign In" className="sign-btn" >Sign In</button>

                <p className="text">
                  Forgotten your password or you login datails? <br/><a href="#">Get help</a> signing in
                </p>
              </div>
            </form>

            <form autocomplete="off" className="sign-up-form" onSubmit={(e)=>{
              e.preventDefault()
              handlesignup()
              }}>
              <div className="logo">
              <img src={logo} alt="easyclassName" />
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account? <a className="toggle" onClick={(e)=>{
                    e.preventDefault();
                    togglemode();
                }}>Sign in</a></h6>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=> setName(e.target.value)}
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=> setLinkedin(e.target.value)}
                  />
                  <label>LinkedIn</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                    onChange={(e)=> setConfPassword(e.target.value)}
                  />
                  <label>Confirm Password</label>
                </div>

                <button type="submit" className="sign-btn" >Sign Up</button>

                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img src={carousel1} className="image img-1 show" alt="" />
              <img src={carousel2} className="image img-2" alt="" />
              <img src={carousel3} className="image img-3" alt="" />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>Improve your skills in your desired fields</h2>
                  <h2>Customize as you like</h2>
                  <h2>Learn with Peers</h2>
                </div>
              </div>

              <div className="bullets">
                <span className="active" data-value="1"></span>
                <span data-value="2"></span>
                <span data-value="3"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default Authentication