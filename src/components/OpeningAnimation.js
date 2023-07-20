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
                <span className='name'>CUGradeView</span> {/* Audiowide */}
            </div>
            <div className='animate glow delay-3'>
                <span className='slogan'>Bringing Scores to Life, with a Click and a Swipe!</span> {/* SourceSans */}
            </div>
        </div>
        );
}

export default OpeningAnimation;