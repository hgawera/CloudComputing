
import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Join from "../../join"

function About() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjFour} />
    </>
  );
}

export default About;