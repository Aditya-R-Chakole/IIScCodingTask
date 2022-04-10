import React from 'react';

import './Home.css'
import CardElement from './Card';

function Home() {
  return (
    <div className="page-container-Home">
      <div className="container-left-Home">
        {/* Left Side of Page Showing Internship Program Details */}
        <div className="pageTitle-Home">
            Welcome to <br></br><u>IISc CiSTUP 2022 Summer Internship Program</u> <br></br>Task Round
        </div>
        <div className="pageBody-Home">
            <b>Aditya R. Chakole</b> <br></br>
            Pre-Final Year Student at IIT Kharagpur
        </div>
      </div>
      <div className="container-right-Home">
        {/* Right Side of Page Showing Features implemented for the Task Round. */}
        <CardElement />
      </div>
    </div>
  );
}

export default Home;
