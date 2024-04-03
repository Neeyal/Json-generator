import { got } from 'got'
export default async function weatherData () {
    const location = 'Ahmedabad'
    const weatherData = await getWeather(location)
    return weatherData
}

const openWeatherMap = {
    BASE_URL : "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY : "e8b610be992499fb1c35dd6e46dc770d"
}

const getWeather = async (address) => {
    try {
        const url = `${openWeatherMap.BASE_URL}${encodeURIComponent(address)}&APPID=${openWeatherMap.SECRET_KEY}`
        const response = await got(url)
        const weatherData = mappingWeatherData(response)
        return weatherData
    } catch (error) {
        console.log(error)
    }
}


function mappingWeatherData (response){
    let  weatherDataObject = {}
    const data = JSON.parse(response.body)
    weatherDataObject.weatherType = data.weather[0].main
    weatherDataObject.temperature = Math.round(data.main.temp - 273.15)
    weatherDataObject.humidity =  data.main.humidity 
    weatherDataObject.city = data.name 
    return weatherDataObject
}