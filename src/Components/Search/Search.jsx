import React, { useState, useEffect } from "react";
import './Search.css';
import { WiDaySunny } from "react-icons/wi";
import { WiDayLightning } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { BsCloudDrizzle } from "react-icons/bs";
import { WiDayRain } from "react-icons/wi";
import { BsCloudHaze } from "react-icons/bs";
import { LuCloudFog } from "react-icons/lu";


function Search() {

    const [searchval, setsearchval] = useState('Shimla');
    const [place, setplace] = useState(null);
    const [cloudiconName, setcloudiconName] = useState()
    const [wind, setwind] = useState();
    const [icon, seticon] = useState(<WiDaySunny/>)


    useEffect(() => {

        ; (async () => {

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchval}&appid=cead5d445fd157513f3d8d470398335b&units=metric`);
                const resjson = await response.json();
                console.log(resjson);
                setplace(resjson.main);
                const iconcopy = resjson.weather[0].main;
                setcloudiconName(resjson.weather[0].main);
                setwind(resjson.wind);

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
                else if (iconcopy === 'Clear') {
                    seticon(<WiDaySunny />)
                }
                else if (iconcopy === 'Smoke') {
                    seticon(<LuCloudFog />)
                }
                else {
                    seticon(<WiDaySunny />)
                }

            } catch (error) {
                throw error
            }

        })()

    }, [searchval])


    const handleonchange = (event) => {
        setsearchval(event.target.value)
    }


    return (
        <>
            <div className="container-search">
                <div className="box">
                    <input type="search" className="searchbox" onChange={handleonchange} placeholder="Search city name" />

                    {!place ? (

                        <div>
                            <div className="searchResultBox">
                                <div className="weatherIcon">
                                    <div className="icon">
                                        {icon}
                                    </div>
                                    <div className="description">
                                   {cloudiconName}
                                    </div>
                                </div>
                                <div className="placeAndweather">
                                    <h2 className="searchPlaceheading">{searchval}</h2>
                                    <h1 className="searchTempheading"> 23°c</h1>
                                    <h4>Feels like 25°C</h4>
                                </div>
                            </div>

                            <div className="weather-data-container">
                                <div className="weather-data">
                                    <div className="data">Maximum Temperature</div> <div className="data-value">Not Found</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Minimum Temperature</div> <div className="data-value">Not Found</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Humidity</div> <div className="data-value">Not Found</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Wind Speed</div> <div className="data-value">Not Found</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Chance of Rain</div> <div className="data-value">Not Found</div>
                                </div>

                            </div>
                        </div>


                    ) : (

                        <div>
                            <div className="searchResultBox">
                                <div className="weatherIcon">
                                    <div className="icon">
                                        {icon}
                                    </div>
                                    <div className="description">
                                    {cloudiconName}
                                    </div>
                                </div>
                                <div className="placeAndweather">
                                    <h2 className="searchPlaceheading">{searchval}</h2>
                                    <h1 className="searchTempheading"> {place.temp.toFixed(0)}°c</h1>
                                    <h4>Feels like {place.feels_like.toFixed(0)}°C</h4>
                                </div>
                            </div>

                            <div className="weather-data-container">
                                <div className="weather-data">
                                    <div className="data">Maximum Temperature</div> <div className="data-value">{place.temp_min.toFixed(0)}°c</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Minimum Temperature</div> <div className="data-value">{place.temp_max.toFixed(0)}°c</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Humidity</div> <div className="data-value">{place.humidity}%</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Wind Speed</div> <div className="data-value">{wind.speed} m/s</div>
                                </div>
                                <div className="weather-data">
                                    <div className="data">Atmospheric Pressure</div> <div className="data-value">{place.pressure} hPa</div>
                                </div>

                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}

export default Search;