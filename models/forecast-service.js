const fetch = require('node-fetch');
module.exports = (sequelize, DataTypes) => {
  const getForecast = async (location)=> {
    //constructing geocoding url
    var geocoding_url = new URL("https://maps.googleapis.com/maps/api/geocode/json"),
    params = {address: location, key: process.env.GEOCODING_API}
    Object.keys(params).forEach(key => geocoding_url.searchParams.append(key, params[key]))
    // getting lattitude and longitude for a city
    const latLonData = await  mainFetch(geocoding_url);

    let lat = latLonData["results"][0]["geometry"]["location"]["lat"]
    let lon = latLonData["results"][0]["geometry"]["location"]["lng"]
    // constructing url for darksky api
    var darkSkyUrl = "https://api.darksky.net/forecast/" + process.env.DARK_SKY_API_KEY + "/" + lat + "," + lon
    // const forecastData will get forecast data for a city
    const forecastData =  await mainFetch(darkSkyUrl);
    // _forecastFormatter will format the data received fron api key according to our needs.
    return await  _forecastFormatter(forecastData, location)
  }

  function _forecastFormatter(result, location) {
    return {
      "location": location,
      "currently": result["currently"],
      "hourly": result["hourly"],
      "daily": result["daily"]
    }
  }

  const mainFetch = async (url) => {
    try{
      const response = await fetch(url)
      return await response.json()
    }catch(error){
      throw new Error(error.message)
    }
  }
  // module.exports returns getForecast function
  return getForecast
};
