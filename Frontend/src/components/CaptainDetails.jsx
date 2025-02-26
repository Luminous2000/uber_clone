import React, { useContext } from 'react'
 import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext)
  return (
    <div >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <img className="h-10 w-10 rounded-full object-cover" src="data:image/jpeg;base64,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" alt="" />
            <h4 className="text-lg capitalize font-medium">{captain.fullname.firstname+ " " +captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹295.20</h4> 
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-6 bg-gray-100 rounded-xl gap-5 justify-center items-start">
          < div className="text-center">
            <i className="ri-time-line text-3xl  font-extralight"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="ri-speed-up-line text-3xl  font-extralight"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="ri-booklet-line text-3xl  font-extralight"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
  )
}

export default CaptainDetails