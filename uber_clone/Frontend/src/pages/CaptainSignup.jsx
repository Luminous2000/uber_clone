import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");


  const {captain, setCaptain} = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    console.log(captainData);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      console.log(data.captain);
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
          <h3 className="text-lg  font-medium mb-2">
            What's the Captain's Name
          </h3>
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

          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
            />
            <input
              className="bg-[#eeeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate Number"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              required
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
              min="1"
            />
            <select
              className="bg-[#eeeeeee] rounded px-4 py-2 border w-1/2 text-lg"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-6  rounded px-4 py-2 border w-full text-lg  placeholder:text-base   ">
            Create Captain Account
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
        <p className="text-[10px] mt-8 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
