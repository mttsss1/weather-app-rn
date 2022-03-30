export default async function getCurrentWeather (locationCoords){
  const axios = require ('axios')

  const lat = locationCoords.latitude

  const log = locationCoords.longitude

  var result = []
  console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=40a5f7559101e8312445dfae9a9b0db1`)
  await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=40a5f7559101e8312445dfae9a9b0db1`)
  .then((response) => {
    const data = response.data
    const locationName = (data.sys.country + ',' + data.name)
    const temperatureMin = data.main.temp_min
    const temperatureMax = data.main.temp_max
    const wind = data.wind.speed
    const umidity = data.main.umidity
    const currentTemperature = data.main.temp

    result = [
      locationName, 
      temperatureMax, 
      temperatureMin, 
      wind, 
      umidity, 
      currentTemperature
    ]
  })
  .catch((error)=> {
    console.log(error)
  })

  return result

}
