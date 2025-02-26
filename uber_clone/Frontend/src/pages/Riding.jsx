import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

  const location = useLocation();
  const {ride} = location.state || {}
  const {socket} = useContext(SocketContext)
  const navigate = useNavigate();
  
  socket.on("ride-ended",()=>{
    navigate('/home')
  })

console.log(ride)


  
  return (
    <div className="h-screen">
        <Link to='/home'  className="fixed h-10 w-10 right-2 top-2  bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        
      <div className="h-1/2 ">
        {/* <img
          className="h-full w-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map-gif"
        /> */}
        <LiveTracking/>
      </div>

      <div className="h-1/2">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
            alt="uber_car"
          />
          <div className="text-right">
            <h2 className="text-lg capitalize font-medium">{ride.captain.fullname.firstname+" "+ride.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold  capitalize -mt-1 mb-1">{ride.captain.vehicle.plate}</h4>
            <p className="text-sm capitalize text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5">
            
            <div className="flex items-center gap-5 p-3 border-b-1">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm capitalize text-gray-500 -mt-1">
                {ride.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride.fare}</h3>
                <p className="text-sm text-gray-500 -mt-1">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-5 bg-green-700 text-white font-semibold p-2 rounded-lg ">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
