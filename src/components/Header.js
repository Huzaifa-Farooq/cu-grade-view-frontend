import React, { useState } from 'react';

import NewReportDialog from './NewReportDialog';
import StudentProfile from './StudentProfile';
import VerticalLine from './VerticalLine';


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
        <nav>
            <ul>
                <button disabled={!props.hasResponseData} onClick={() => handleItemClick('newReport')}>
                  New Report
                </button>
            </ul>
        </nav>

        <VerticalLine width={"100%"} />

        {props.profileData && <StudentProfile profileData={props.profileData} />}

        {showNewReportDialog && <NewReportDialog closeDialog={closeDialog} onSessionIdSubmit={props.onSessionIdSubmit} />}
        <h1>Report</h1>
    </header>
    );
};

export default Header;
