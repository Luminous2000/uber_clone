import React from 'react'

const WaitingForDriver = (props) => {
  // console.log(props.ride?.captain)
  return (
    <div>
      <h5
        className="p-4 text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <div className='flex items-center justify-between'>
      <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
          alt="uber_car"
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname+" "+props.ride?.captain.fullname.lastname}</h2>
          <h4 className='text-xl font-semibold -mt-1 mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-sm  font-semibold text-gray-600'>OTP - {props.ride?.otp}</h1>
        </div>

      </div>
      
      <div className="flex flex-col justify-between items-center gap-2">
        
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className=" ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-500 -mt-1">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-500 -mt-1">
              {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-500 -mt-1">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver