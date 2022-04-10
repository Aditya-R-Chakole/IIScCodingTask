import { useEffect, useState } from "react";
import React from 'react';

import firebase from "firebase/compat/app"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import './PhoneAuth.css'
import CardElement from './Card';

function PhoneAuth() {
  // Defining required useState Variables and other details
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [OTP, setOTP] = useState('');
  const [show, setShow] = useState(false);
  const [finalResult, setFinalResult] = useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyCe-ZRaeQuiOdhnanY0bjGbJBWyvO7ICfc",
    authDomain: "phone-auth-382ed.firebaseapp.com",
    projectId: "phone-auth-382ed",
    storageBucket: "phone-auth-382ed.appspot.com",
    messagingSenderId: "507325133526",
    appId: "1:507325133526:web:21828f3f2efc5c9f6f4f77"
  };

  // Initializing FireBase 
  useEffect(()=>{
    firebase.initializeApp(firebaseConfig);
  }, []);

  //  Functio to LogIn using SMS verification
  const signIn = () => {
    if(phoneNumber.length === 13){
      const auth = getAuth();
      let appVerifier = new RecaptchaVerifier('recaptcha', {}, auth);
      
      signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((result)=>{
        setFinalResult(result);
        alert('OTP Sent !!!');
        setShow(true);
      }).catch((error)=>{
        alert(error);
      })
    }
    return;
  }

  // Function to verify OTP
  const verifyOTP = () => {
    if( finalResult!=null && OTP!=null ){
      finalResult.confirm(OTP).then((result)=>{
        localStorage.setItem('user', phoneNumber)
        window.location.reload(false);
      }).catch((error)=>{
        alert("Wrong Code");
      })
    }
    return ;
  }

  return (
    <div className="page-container-PhoneAuth">
      <div className="container-left-PhoneAuth">
        {/* Left Side of Page to Input Phone Number and OTP */}
        <div className="pageTitle-PhoneAuth">
            LogIn here
        </div>
        <div className="pageBody-PhoneAuth">
          <div>
            <div style={{fontSize:'14px'}}>Enter you <b>phone number</b> with <b>country code</b>...</div>
            <input style={{marginBottom:'5px'}} value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} placeholder="Enter your Phone-number !!!" />
            <div id="recaptcha" className="g-recaptcha" style={{display: show ? "none" : "block", marginBottom:'5px'}}></div>
            <button onClick={signIn} style={{display: show ? "none" : "block", marginBottom:'5px'}}>Send OTP</button>
          </div>
          <div style={{display: show ? "block" : "none"}}>
            <input style={{marginBottom:'5px'}} type="text" onChange={(e)=>{setOTP(e.target.value)}} placeholder="Enter your OTP here"></input>
            <button onClick={verifyOTP}>Verify</button>
          </div>
        </div>
      </div>
      <div className="container-right-PhoneAuth">
        {/* Right Side of Page Showing Features implemented for the Task Round. */}
        <CardElement />
      </div>
    </div>
  );
}

export default PhoneAuth;
