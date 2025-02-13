import React from 'react'

const LocationSearchPanel = (props) => {

  // console.log(props)

  // sample array for location
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians coding school",
    "DB Gupta Road, Karol Bagh, Delhi",
    "IGI Airtport Terminal 3, New Delhi, Delhi",
    "New Delhi Railway Station, New Delhi, Delhi"
  ]
  return (
    <div>
        {/* this is a samplw data */}
        {
          locations.map((elem,index)=>{
            return < div key={index} onClick={()=>{
              props.setVehiclePanelOpen(true)
              props.setPanelOpen(false)
            }}  className='flex items-center  justify-start gap-4 border-2 border-gray-50 active:border-black rounded-xl my-2  p-3 '>
            <h2 className='bg-[eee] h-8  w-12 flex items-center justify-center rounded-full'   >
              <i className="ri-map-pin-fill "></i></h2>
            <h4  className='font-medium '>{elem}</h4>
        </div>
            
          })
        } 
    </div>
  )
}

export default LocationSearchPanel