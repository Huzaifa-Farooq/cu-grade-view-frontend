import React, { useState } from 'react';

import NewReportDialog from './NewReportDialog';
import StudentProfile from './StudentProfile';
import VerticalLine from './VerticalLine';
import { Slogan, Name } from './OpeningAnimation';

import logo from '../images/logo.png';


function Header(props){
  const [showNewReportDialog, setshowNewReportDialog] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const showElementMap = {
    'newReport': [showNewReportDialog, setshowNewReportDialog],
    'contact': [showContact, setShowContact],
    };

  const handleItemClick = (item) => {
    for (const [key, value] of Object.entries(showElementMap)) {
        const [show, setShow] = value;
        key === item ? setShow(!show) : setShow(false);
    };
  };

  const closeDialog = () => {
    setshowNewReportDialog(false);
  };

  return (
    <header id="header">
      <div className='top-bar'>
        <div className='logo'><img src={logo}></img></div>
        <div>
          <div className='name'><Name /></div>
          <div className='slogan'><Slogan /></div>
        </div>
      </div>
        <nav>
            <ul>
                <li>
                  <a disabled={!props.hasResponseData} onClick={() => handleItemClick('newReport')}>
                    New Report
                  </a>
                </li>
                <li>
                  <a onClick={() => props.displayDemo()}>
                    Demo Report
                  </a>
                </li>
              </ul>
        </nav>

        {/* <VerticalLine width={"100%"} /> */}

        {props.profileData && <StudentProfile profileData={props.profileData} />}

        {showNewReportDialog && <NewReportDialog closeDialog={closeDialog} onSessionIdSubmit={props.onSessionIdSubmit} />}
        <h1>Report</h1>
    </header>
    );
};

export default Header;
