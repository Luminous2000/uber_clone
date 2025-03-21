import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import UserContext, { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("user:", user);
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    // console.log("ride confirmed", ride);
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

 socket.on("ride-started", (ride) => {

  setWaitingForDriver(false);
  navigate('/riding',{state:{ride}}) 
  
 });
  

  const submitHandler = (e) => {
    e.preventdefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "24px",
          // opacity:"1"
        });
        gsap.to(panelClose.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          // opacity:'0'
        });
        gsap.to(panelClose.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmedRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      setFare(response.data);
    } catch (error) {
      console.error("Error fetching trip suggestions:", error);
      setVehiclePanelOpen(false);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-icon"
      />

      <div className="h-screen w-screen">
        {/* image for temporary use */}
{/* {        <img
          className="h-full w-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map-gif"
        />} */}
        <LiveTracking/>
      </div>
      <div className=" h-full flex flex-col justify-end absolute top-0 w-full ">
        <div className="h-[30%] bg-white p-6  relative">
          <h5
            ref={panelClose}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute top-3 right-2 text-2xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-500 border "></div>
            <input
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-base  w-full mt-3 rounded-lg"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveInput("destination");
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-base  w-full mt-3 rounded-lg"
              type="text"
              placeholder="Add a drop location"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black w-full text-white px-4 py-2 rounded"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=" bg-white  h-0  ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            activeInput={activeInput}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setVehicleType={setVehicleType}
            fare={fare}
          />
        </div>
        <div
          ref={confirmedRideRef}
          className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white"
        >
          <ConfirmedRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-10 bottom-0 
          
          px-3 py-6 pt-12 bg-white"
        >
          <WaitingForDriver
            ride={ride}
            setWaitingForDriver={setWaitingForDriver}
            setVehicleFound={setVehicleFound}
            waitingForDriver={waitingForDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
