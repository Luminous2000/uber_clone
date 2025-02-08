import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const CaptainLogin = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState('')
  
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email, 
        password: password
      })
      // console.log(userData);
  
      setEmail('');
      setPassword('');
    }
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="welcome"
        />

        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>
          <p className="text-center " >Drive with us <Link to='/captain-signup' className="mb-3 text-blue-600">Register as a captain</Link>
          </p>
      </div>
      <div>
        <Link to="/login"
         className="bg-[#111] text-white font-semibold flex justify-center items-center mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base ">
          Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin