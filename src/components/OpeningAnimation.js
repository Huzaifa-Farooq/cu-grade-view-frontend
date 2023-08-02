import React, { useEffect, useState } from 'react';
import '../assets/css/intro-animation.css';


const imageSource = require('..//images/logo.png');

function OpeningAnimation(props) {
    return (
        <div className='animation'>
            <div className='animate glow delay-1'>
                <img className='' alt='Logo' src={imageSource}></img>
            </div>
            <div className='animate glow delay-2'>
                <Name />
            </div>
            <div className='animate glow delay-3'>
                <Slogan />
            </div>
        </div>
        );
}

const Slogan = (props) => {
    return <span className='app-slogan'>Bringing Scores to Life, with a Click and a Swipe!</span> /* SourceSans */
}

const Name = (props) => {
    return <span className='app-name'>CUGradeView</span> /* Audiowide */
}


export default OpeningAnimation;
export { Slogan, Name };