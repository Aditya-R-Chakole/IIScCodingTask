import { useState } from "react";
import React from 'react';

import { Map, Marker } from "pigeon-maps"
import 'bootstrap/dist/css/bootstrap.min.css';
import './ODDCal.css';

function ODDCal() {
  // Defining required useState Variables and other details
  const [origin, setOrigin] = useState('');
  const [oLatLong, setOLatLong] = useState({'lat':0, 'lng':0});
  const [destination, setDestination] = useState('');
  const [dLatLong, setDLatLong] = useState({'lat':0, 'lng':0});
  const [data, setData] = useState({});
  const APIKey = 'cZrRhJKgF0Qe4wjI2D5EvJ93mSX0x'
  const url = 'https://api.distancematrix.ai/maps/api/distancematrix/json?'
  const urlLatLong = 'https://api.distancematrix.ai/maps/api/geocode/json?'

  // Function to Fetch Diistance and Time Details
  async function fetchDistJSON() {
    const response = await fetch(url+'origins='+origin+'&destinations='+destination+'&key='+APIKey);
    const responseJson = await response.json();
    return responseJson;
  }

  // Function to Fetch Lat, Long details given any Locations
  async function fetchLatLongJSON(address) {
    const response = await fetch(urlLatLong+'address='+address+'&key='+APIKey);
    const responseJson = await response.json();
    return responseJson;
  }

  // Function to trigger Distance-Matrix API
  const findDist = () => {
    fetchDistJSON()
    .then(response => {
      setData(response);
      setDestination(response['destination_addresses']);
      setOrigin(response['origin_addresses'])
    })
    .catch(error => console.log(error))

    fetchLatLongJSON(origin)
    .then(response => {
      setOLatLong(response['result'][0]['geometry']['location']);
    })
    .catch(error => console.log(error))

    fetchLatLongJSON(destination)
    .then(response => {
      setDLatLong(response['result'][0]['geometry']['location']);
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="page-container-ODD">
      <div className="container-left-ODD">
        {/* Left Side of Page to Input Origin and Destination */}
        <div className="pageTitle-ODD">
          O-D Distance Calculator
        </div>
        <div className="pageBody-ODD">
        <input type="text" style={{'marginBottom':'5px', 'marginLeft':'5px', 'width':'95%'}} onChange={(e)=>{setOrigin(e.target.value)}} placeholder="Enter Origin"></input>
        <input type="text" style={{'marginLeft':'5px', 'width':'95%'}} onChange={(e)=>{setDestination(e.target.value)}} placeholder="Enter Destination"></input>
        <button style={{'margin':'5px', 'width':'46%'}} onClick={findDist}>Submit</button>

        {Object.keys(data).length!==0 ? <div style={{'margin':'5px'}}> Distance - <b>{data['rows'][0]['elements'][0]['distance']['text']}</b><br></br>Time - <b>{data['rows'][0]['elements'][0]['duration']['text']}</b></div> : <div> </div>}
        </div>
      </div>
      <div className="container-right-ODD">
        {/* Right Side of Page Showing Map using Pigeon-Maps API*/}
        <Map defaultCenter={[21.9012, 77.8960]} defaultZoom={5}>
          {Object.keys(data).length!==0 ? <Marker width={50} anchor={[oLatLong['lat'], oLatLong['lng']]} /> : <></>}
          {Object.keys(data).length!==0 ? <Marker width={50} anchor={[dLatLong['lat'], dLatLong['lng']]} /> : <></>}
        </Map>
      </div>
    </div>
  );
}

export default ODDCal;
