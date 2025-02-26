import { header } from 'express-validator'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocationSearchPanel = ({ pickup, destination, setPickup, setDestination, setPanelOpen, setVehiclePanelOpen, activeInput }) => {

  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error,  setError]  = useState(null)

  const getSuggestions = async (input) =>{
     if(!input) return setSuggestions([])

      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
          params:{input},
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }})
        // console.log(response.data)
        setSuggestions(response.data)
      }catch(err){
        setError('Failed to fetch suggestions',err)
        console.error(err);
      }finally{
        setLoading(false)
      }
  }
 useEffect(() => {
   const input = activeInput ==='pickup'? pickup : destination
  getSuggestions(input)
   
 }, [pickup,destination,activeInput])

 const handleSuggestionClick = (suggestion) =>{
  // console.log(suggestion)
  if(activeInput == 'pickup'){
    setPickup(suggestion.description)
  }else{
    setDestination(suggestion.description)
  }
 

 if(pickup && destination){
  // setVehiclePanelOpen(true)
 }
//  setPanelOpen(false)
 }
 

  // console.log(props)

  
  return (
    <div>
        {loading && <div className='p-4'>Loading suggestions...</div>}
        {error && <div className='p-4 text-red-500'>{error}</div>}

        {suggestions.map((elem, index) => {
          // console.log('suggestion', suggestions)
          // console.log('elem', elem)
          return(

          <div 
            key={index} 
            onClick={() => handleSuggestionClick(elem)}
            className='flex items-center justify-start gap-4 border-2 border-gray-50 active:border-black rounded-xl my-2 p-3'
          >
            <h2 className='bg-[eee] h-8 w-12 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{elem.description}</h4>
          </div>
        )})}
    </div>
  )
}

export default LocationSearchPanel