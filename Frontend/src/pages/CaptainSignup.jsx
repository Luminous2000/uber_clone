import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullname: {
          firstname: firstname,
          lastname: lastname,
        },
        email: email,
        password: password,
      });
      // console.log(userData);
  
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    };


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="welcome"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg  font-medium mb-2">What's the Captain's Name</h3>
          <div className="flex gap-4 mb-6 ">
            <input
              className="bg-[#eeeeeee]  rounded px-4 py-2 border w-1/2 text-lg  placeholder:text-base   "
              required
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeeee]  rounded px-4 py-2 border w-1/2 text-lg  placeholder:text-base   "
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg  font-medium mb-2">Our Captain's email</h3>
          <input
            className="bg-[#eeeeeee] mb-6  rounded px-4 py-2 border w-full text-lg  placeholder:text-base   "
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <h3 className="text-lg  font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeeee] mb-6  rounded px-4 py-2 border w-full text-lg  placeholder:text-base   "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-6  rounded px-4 py-2 border w-full text-lg  placeholder:text-base   ">
            Signup
          </button>
        </form>
        <p className="text-center ">
          Already a Captain?{" "}
          <Link to="/captain-login" className="mb-3 text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline" >Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply</p>
      </div>
    </div>
  )
}

export default CaptainSignup