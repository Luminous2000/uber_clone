import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'

const CaptainRiding = (props) => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)

    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      );
    
  return (
    <div className="h-screen relative">
        
      <div className="fixed w-screen p-6 top-0 flex items-center justify-between ">
        <img
          className="w-16  "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber-icon"
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5 ">
        <img
          className="h-full w-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map-gif"
        />
      </div>

      <div onClick={()=>{
        setFinishRidePanel(true)
      }}
       className="h-1/5 p-6 flex relative items-center justify-between bg-yellow-400 ">
      <h5
        className="p-1 text-center  absolute top-0 w-[94%] "
        onClick={() => {
        //   props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200  ri-arrow-down-wide-line"></i>
      </h5>
      <h4 className=' text-xl font-semibold '>4 Km Away</h4>
      <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              //   props.setRidePopupPanel(false)
            }}
            className="  bg-green-700 text-white font-semibold p-3 px-10 rounded-lg "
          >
            Compelete Ride
          </button>

        
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed h-screen w-full z-10 bottom-0 translate-y-full  px-3 py-6 pt-12 bg-white"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
      
    </div>
  )
}

export default CaptainRiding