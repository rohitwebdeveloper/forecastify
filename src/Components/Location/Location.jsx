import React, { useState, useEffect } from "react";
import './Location.css'
// import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
// import { MdLocationOff } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
// import { WiDayThunderstorm } from "react-icons/wi";
import { WiDayLightning } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { BsCloudDrizzle } from "react-icons/bs";
import { WiDayRain } from "react-icons/wi";
import { BsCloudHaze } from "react-icons/bs";
import { LuCloudFog } from "react-icons/lu";




function Location() {
    // const navigate = useNavigate();

    const date = new Date().toLocaleDateString("en-IN", {
        month: 'short',
        day: 'numeric',
        weekday: 'long'
    });

    const [temperature, settemperature] = useState()
    const [cityname, setcityname] = useState()
    const [cloudiconName, setcloudiconName] = useState()
    const [sunriseValue, setsunriseValue] = useState()
    const [sunsetValue, setsunsetValue] = useState()
    const [icon, seticon] = useState(<WiDaySunny />)
    const [load, setload] = useState(true)
    const [err, seterr] = useState(false)

    const sunriseDate = new Date(sunriseValue*1000);
    const sunriseTime = sunriseDate.toLocaleTimeString('en-IN', {
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
    } );

    const sunsetDate = new Date(sunsetValue*1000);
    const sunsetTime = sunsetDate.toLocaleTimeString('en-IN', {
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
    } )
 


    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            // setlatitude(latitude)
            // setlongitude(longitude)

            ; (async () => {

                try {
                    seterr(false)
                    setload(true)
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cead5d445fd157513f3d8d470398335b&units=metric`;
                    const response = await fetch(url);
                    const resjson = await response.json();
                    console.log(resjson);
                    settemperature(resjson.main);
                    setcityname(resjson.name);
                    setcloudiconName(resjson.weather[0].main);
                    setsunriseValue(resjson.sys.sunrise)
                    setsunsetValue(resjson.sys.sunset)
                    const iconcopy = resjson.weather[0].main;
                    setload(false)

                    if (iconcopy === 'Clouds') {
                        seticon(<WiDayCloudy />)
                    }
                    else if (iconcopy === 'Rain') {
                        seticon(<WiDayRain />)
                    }
                    else if (iconcopy === 'Thunderstorm') {
                        seticon(<WiDayLightning />)
                    }
                    else if (iconcopy === 'Drizzle') {
                        seticon(<BsCloudDrizzle />)
                    }
                    else if (iconcopy === 'Snow') {
                        seticon(<WiDaySnow />)
                    }
                    else if (iconcopy === 'Haze') {
                        seticon(<BsCloudHaze />)
                    }
                    else if (iconcopy === 'Smoke') {
                        seticon(<LuCloudFog />)
                    }
                    else {
                        seticon(<WiDaySunny />)
                    }


                } catch (error) {
                    console.log("THIS IS A ERROR", error);
                    setload(false)
                    seterr(true)
                }

            })()
        })

    }, [])


    // const forecastClick = () => {
    //     navigate('/forecast')
    // }


    if (load == true) {
        return <h1 className="loading">Loading...</h1>
    }

    if (err === true) {
        return <h1 className="wentWrong"> Sorry! Something Went Wrong</h1>
    }


    return (
        <>

            <div className="container-location">

                <div className="location-name">
                    <FaLocationDot className="location-icon" />
                    {cityname}, India
                </div>
                <div className="date">
                    <div className="today">Today</div>
                    <div className="dateiconcopy">{date}</div>
                </div>

                <div className="location-temperature">
                    <div className="cloud-icon">
                        <div className="weather-icon">{icon}</div>
                        <div className="description">
                            {cloudiconName}
                        </div>

                    </div>

                    <div className="temperature">
                        {temperature.temp.toFixed(0)}°c
                        <div className="min-max">
                            <div className="max-temp"> Feels like: {temperature.feels_like.toFixed(0)}°c</div>
                            <div className="min-temp">Humidity: {temperature.humidity}%  </div>
                        </div>
                        <div className="riseTime">
                            <div className="sun rise"> Sunrise: {sunriseTime}</div>
                            <div className="sun set"> Sunset   : {sunsetTime}</div>
                        </div>
                    </div>
                </div>


                {/* <div className="btn"><button className="forecastBtn" onClick={forecastClick} >Forecast ➡</button></div> */}
            </div>

        </>
    )
}

export default Location;