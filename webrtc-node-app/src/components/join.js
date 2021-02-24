import React from 'react';
import { Button } from './button';
import './join.css';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import {SiGoogleclassroom} from "react-icons/si"
import {SiGooglehangoutsmeet} from "react-icons/si"
import {GiVideoConference} from "react-icons/gi"

function Join() {
  return (
    <IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className='join__section'>
        <div className='join__wrapper'>
          <h1 className='join__heading'>Join Room</h1>
          <div className='join__container'>
            <Link to='/room1' className='join__container-card'>
              <div className='join__container-cardInfo'>
                <div className='icon'>
                  <SiGooglehangoutsmeet />
                </div>
                <h3>Join Room</h3>
                <h4>Room 1</h4>
                <p>People in room: </p>
                <ul className='join__container-features'>
                  <li>Safe</li>
                  <li>Secure</li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  Join Room 1
                </Button>
              </div>
            </Link>
            <Link to='/room2' className='join__container-card'>
              <div className='join__container-cardInfo'>
                <div className='icon'>
                  <SiGoogleclassroom />
                </div>
                <h3>Join Room</h3>
                <h4>Room 2</h4>
                <p>People in room: </p>
                <ul className='join__container-features'>
                  <li>Safe</li>
                  <li>Secure</li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='blue'>
                  Join Room 2
                </Button>
              </div>
            </Link>
            <Link to='/room3' className='join__container-card'>
              <div className='join__container-cardInfo'>
                <div className='icon'>
                  <GiVideoConference />
                </div>
                <h3>Join Room</h3>
                <h4>Room 3</h4>
                <p>People in room: </p>
                <ul className='join__container-features'>
                  <li>Safe</li>
                  <li>Secure</li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  Join Room 3
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Join;