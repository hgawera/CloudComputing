import React from 'react';
import './Footer.css';
import { Button } from '../../button';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import { BsCameraVideoFill } from "react-icons/bs"

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <BsCameraVideoFill className='navbar-icon' />
              MOOZ
            </Link>
          </div>
          <small className='website-rights'>MOOZ © 2021</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to={
                'https://www.youtube.com/watch?v=2ocykBzWDiM&ab_channel=Revideo'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;