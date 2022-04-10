import { useEffect, useState } from "react";
import React from 'react';

import './EnumeratorMonitoring.css'

function EnumeratorMonitoring() {
  // Defining required useState Variables and other details
  const [data, setData] = useState({});
  const [date, setDate] = useState("2022-04-03");
  
  const URL = "https://oshr.cistup.iisc.ac.in:443/enumstatus"
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({"input_date" : date}),
    redirect: 'follow'
  };

  // Function to Trigger Enumerator Monitoring API
  const handleSubmit = () => {
      fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result['data']);
        })
        .catch(error => alert(error));
  }

  // useEffect Function to call Enumerator Monitoring API at the start of application with default data as input
  useEffect(()=>{
    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData(result['data']);
        })
        .catch(error => alert(error));
  }, [])

  return (
    <div className="page-container-EMeasuring">
      <div className="container-left-EMeasuring">
        {/* Left Side of Page to Input Date */}
        <div className="pageTitle-EMeasuring">
          Enumerator Monitoring
        </div>
        <div className="pageBody-EMeasuring">
          This Page displays <b>Enumerator data</b>, fetched using <b>IISc API</b> for a below <b>given date</b>.
          <input type="date" id="date" style={{'marginBottom':'5px', 'width':'100%'}} defaultValue={date} onChange={(e)=>{setDate(e.target.value)}} />
          <input type="submit" style={{'width':'100%'}} onClick={handleSubmit}/>
        </div>
      </div>
      <div className="container-right-EMeasuring">
        {/* Right Side of Page Showing Data Fetched from the IISc Enumerator Monitoring API */}
        {Object.keys(data).length!==0 ? (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th><b>ID</b></th>
                        <th><b>Enumerator Name</b></th>
                        <th><b>Enumerator Org</b></th>
                        <th><b>First Page Time</b></th>
                        <th><b>SP4 Time</b></th>
                        <th><b>Last Page Time</b></th>
                        <th><b>Last Page accessed</b></th>
                        <th><b>Ward No.</b></th>
                        <th><b>Location Code</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((info)=>{
                            return (
                                <tr key={info.id}>
                                    <td><b>{info.id}</b></td>
                                    <td><b>{info.enumerator_name}</b></td>
                                    <td><b>{info.enumerator_org}</b></td>
                                    <td><b>{info.page_1_timestamp}</b></td>
                                    <td><b>{info.sp_page_4_time}</b></td>
                                    <td><b>{info.last_page_time}</b></td>
                                    <td><b>{info.last_page}</b></td>
                                    <td><b>{info.ward_no}</b></td>
                                    <td><b>{info.location_code}</b></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        ):(<div></div>)}
        
      </div>
    </div>
  );
}

export default EnumeratorMonitoring;
