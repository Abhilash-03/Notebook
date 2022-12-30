import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({email:"", password:""});
  
  let navigate = useNavigate();
  
  const handleSubmit = async(e)=>{
      e.preventDefault();
        //API CALL
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password}),
    });
       
    const json = await response.json();
    console.log(json);

    if(json.success){
      //Save the auth-token and redirect
       localStorage.setItem('token', json.authtoken);
       navigate('/');
    }
    else{
      alert("Please try with correct email and password.")
    }

  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" name='email'/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" >Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default Login
