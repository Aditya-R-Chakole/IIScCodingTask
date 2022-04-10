import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import planetEarth from './imgs/planet-earth.png'; 
import stats from './imgs/stats.png'
import './Card.css'

function CardElement() {
    // Defining URLs
    const oddcURL = '/ODDistanceCalculator'
    const emURL = '/EnumeratorMonitoring'

    // Redirect to O-D Distance Calculator Page
    const routeToODDCalcuator = () =>{ 
        window.location.href = oddcURL;
    }

    // Redirect to Enumerator Monitoring Page
    const routeToEMonitor = () =>{ 
        window.location.href = emURL;
    }

  return (
    <div className='cardWrapper'>
        <div>
            {/* O-D Distance Calculator Card */}
            <Card className='cardClass' bg="dark" variant="dark" onClick={routeToODDCalcuator}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <img src={planetEarth} alt="planetEarth" style={{width:'150px', padding:'10px'}}/>
                </div>
                <Card.Body>
                    <Card.Title><b>O-D Distance Calculator</b></Card.Title>
                    <Card.Text>
                    displays <b>Distance and Time to travel</b>, fetched using <b>DistanceMatrix.AI API</b>.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

        <div>
            {/* Enumerator Monitoring Card */}
            <Card className='cardClass' bg="dark" variant="dark" onClick={routeToEMonitor}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <img src={stats} alt="stats" style={{width:'150px', padding:'10px'}}/>
                </div>
                <Card.Body>
                    <Card.Title><b>Enumerator Monitoring</b></Card.Title>
                    <Card.Text>
                    displays <b>Enumerator data</b>, fetched using <b>IISc API</b> for a <b>given date</b>.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default CardElement;
