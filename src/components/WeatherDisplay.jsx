import SearchBar from "./searchbar";
import Loader from "./Loader";
import { FaCloud, FaEye, FaWind} from "react-icons/fa";
import { Droplets } from "lucide-react";
import { useState, useEffect } from "react";
import { LuSunrise, LuSunset, LuThermometer } from "react-icons/lu";
import sunny from "../assets/weather_img/sunny.png";
import cloudy from "../assets/weather_img/cloudy.png";
import rainy from "../assets/weather_img/rainy.png";
import snow from "../assets/weather_img/snow.png";
import thunder from "../assets/weather_img/thunder.png";
import bg from "../assets/weather_img/weather_bg.png";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WEATHER_BASED_IMG = [
  { main: "Clear", img: sunny },
  { main: "Clouds", img: cloudy },
  { main: "Rain", img: rainy },
  { main: "Drizzle", img: rainy },
  { main: "Thunderstorm", img: thunder },
  { main: "Snow", img: snow },
  { main: "Mist", img: cloudy },
  { main: "Smoke", img: cloudy },
  { main: "Haze", img: sunny },
  { main: "Dust", img: cloudy },
  { main: "Fog", img: cloudy },
  { main: "Sand", img: cloudy },
  { main: "Ash", img: cloudy },
  { main: "Squall", img: rainy },
  { main: "Tornado", img: thunder },
];

export default function WeatherDisplay() {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState("Mumbai");

  useEffect(() => {
    FetchApi();
  }, []);

  async function FetchApi() {
    if (!cityName.trim()) {
      setError("please enter a city name");
      setData(null);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }
      setData(null);
      const data = await response.json();
      setData(data);
      console.log(data);

      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const setValue = (event) => {
    setCityName(event.target.value);
    console.log(event.target.value);
  };

  const HandleKeyDown = (event) => {
    if (event.key === "Enter") {
      FetchApi();
    }
  };

  function ShowSunTime(sun_time) {
    const time = new Date(sun_time * 1000);

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`
   
  }

  return (
    <div
      className="shadow-sm shadow-white backdrop-blur-2xl bg-black px-6 py-4 min-h-[50%] rounded-lg w-5xl overflow-hidden bg-no-repeat bg-"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-center flex-col sm:justify-between sm:flex-row text-center">
        <h4 className="text-3xl flex items-center gap-3 justify-between sm:text-4xl font-bold text-indigo-400 mb-5">
          {" "}
          Weather App <FaCloud />
        </h4>
        <div className="search-container">
          <SearchBar
            onclick={FetchApi}
            onkeydown={HandleKeyDown}
            onchange={setValue}
            cityName={cityName}
            loading={loading}
          />
        </div>
      </div>
      <hr className="backdrop-blur-2xl h-2 hidden md:block bg-white/10 mb-2 text-transparent rounded-2xl"/>

      {error && (
        <p className="text-center flex flex-col text-amber-300 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-3xl">404</span>
          {error}
        </p>
      )}
      {loading && <Loader className={'w-12 h-12 border-8 absolute top-[50%] left-[50%] z-20'}/>}

      {data && !loading && !error && (
        <div className="weather-data h-full grid grid-cols-1 md:grid-cols-2 gap-4 p1- sm:p-0">
          <div className="img-container relative overflow-hidden shadow rounded-lg shadow-white p-2 backdrop-blur-[2px]">
            <WeatherImage weatherType={data?.weather[0]?.main} />
            <p className="text-xl sm:text-3xl font-semibold capitalize absolute top-0 left-1/2 w-full text-center -translate-x-1/2">{data?.weather[0]?.description}</p>

            <div className="temp-date-city flex items-center justify-around md:justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
                  {data?.name}{" "}
                  <sup className="bg-white text-black px-2 text-xs circle rounded-full">
                    {data?.sys?.country}
                  </sup>
                </h3>
                <ShowDate api_date={data?.dt} />
              </div>

              <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {Math.round(data?.main?.temp)}
                <span className="text-2xl md:text-4xl italic">°C</span>
              </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
              <h3><span className="text-2xl"><LuThermometer className="inline-block text-orange-400"/> </span>
              Feels like
              </h3>
              <p>
               <span className="mt-2 text-xl">{Math.round(data?.main?.feels_like)}°C</span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
             <h3><span className="text-xl"><FaWind className="inline-block"/> </span>
              Wind
              </h3>
              <p>
                <span className="mt-2 text-xl">
                  {(data?.wind?.speed * 3.6).toFixed(1)} km/h
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
               <h3><span className="text-xl"><Droplets className="inline-block text-sky-400"/> </span>
              Humidity
              </h3>
              <p>
               <span className="mt-2 text-xl">{data?.main?.humidity}%</span>
              </p>
            </div>

            <div className="flex flex-col justify-center items-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
               <h3><span className="text-xl"><FaEye className="inline-block text-gray-300"/> </span>
              Visibility
              </h3>
              <p>
               <span className="mt-2 text-xl">
                {data?.visibility / 1000}/km
               </span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
             <h3><span className="text-xl"><LuSunrise className="inline-block text-yellow-400"/> </span>
              Sunrise
              </h3>
              <p>
               <span className="mt-2 text-xl">{ShowSunTime(data?.sys?.sunrise)}</span>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center backdrop-blur-[2px] shadow shadow-white rounded-md font-bold text-xl">
              <h3><span className="text-xl"><LuSunset className="inline-block text-yellow-600"/> </span>
              Sunset
              </h3>
              <p>
               <span className="mt-2 text-xl">{ShowSunTime(data?.sys?.sunset)}</span>
               </p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

function ShowDate({ api_date }) {
  const date = new Date(api_date * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString(undefined, options);
  return <p className="italic text-xs sm:text-sm lg:text-lg font-semibold">{formattedDate}</p>;
}

function WeatherImage({ weatherType }) {
  const matchedWeather = WEATHER_BASED_IMG.find(
    (item) => item.main === weatherType,
  );
  const weatherImage = matchedWeather?.img;
  return (
  
    <img
      src={weatherImage}
      alt={weatherType}
      className="m-auto w-36 sm:w-44 md:w-52 scale-144"
    />

  );
}
