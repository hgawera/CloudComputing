import React from 'react';
import {Link}from "react-router-dom";
import './HeroSection.css'
import img1 from '../Images/Collab.png';
import img2 from '../Images/Webinar.png';
import img3 from '../Images/Meeting.png';

function HeroSection () {
    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <div className="hero-image-wrapper">
                            <img src={img1} alt ="" className="hero-image"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="hero-content">
                            <span> Meetings and Chat </span>
                            <h2> Keep Collaborating! </h2>
                            <p>Build better relationships, solve business challenges, 
                            and meet happy with the industry's best video meeting experience! 
                                Keep collaborating with team chat.
                            </p> 
                            <br/>
                            <Link to="/join">
                                <button>Join</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="hero-content">
                            <span> Collaborate </span>
                            <h2> Easily find, share & edit ideas in Mooz! </h2>
                            <p>Instantly go from group chat to video call with the touch of a button. 
                                Securely connect, access, share, and coauthor files in real time.
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="hero-image-wrapper">
                                <img src={img2} alt ="" className="hero-image"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="hero-content">
                            <span> Video Webinar </span>
                            <h2> Reach and Qualify more leads. </h2>
                            <p>Reach and qualify more leads, have global company-wide meetings, 
                                and host large-scale trainings with these interactive webinars.
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="hero-image-wrapper">
                                <img src={img3} alt ="" className="hero-image"/>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default HeroSection