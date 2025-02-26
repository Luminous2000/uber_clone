import React, { useRef, useState } from "react";

const RidePopup = (props) => {
  // const ride = props.ride 
  // console.log( "ride:",ride[0].user.fullname.firstname)
  return (
    <div>
      <h5
        className="p-4 text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 border-2 border-yellow-500 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="data:image/jpeg;base64,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"
            alt="rider_img"
          />
          <h2 className="text-lg font-medium">{props.ride?.[0].user.fullname.firstname+" "+props.ride?.[0].user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-500 -mt-1">
                {props.ride?.[0].pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-500 -mt-1">
                {props.ride?.[0].destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.[0].fare}</h3>
              <p className="text-sm text-gray-500 -mt-1">Cash cash</p>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-5 items-center justify-between">
        <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="  bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg "
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide()
            }}
            className="  bg-green-700 text-white font-semibold p-3 px-10 rounded-lg "
          >
            Accept
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
