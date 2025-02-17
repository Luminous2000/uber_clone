const axios = require("axios");
module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// ToDo: need to rewrite the code
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data; // Store data for easier access


    if (data.rows[0].elements[0].status === "OK") {
      return data.rows[0].elements[0]; // Return the element if status is OK
    } else if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
      throw new Error("No routes found");
    } else if (data.rows[0].elements[0].status === "NOT_FOUND") {
        throw new Error("Origin or destination not found");
    } else if (data.rows[0].elements[0].status === "MAX_ROUTE_LENGTH_EXCEEDED") {
        throw new Error("Max route length exceeded");
    }
    else {
      throw new Error(`Distance Matrix API Error: ${data.rows[0].elements[0].status}`); // More specific error
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutoCompeleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
