import WeatherCondition from "./WeatherCondition";
import { useWeatherContext } from "../contexts/WeatherContext";

function CurrentWeather() {
  const { weather } = useWeatherContext();

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col md:gap-2'>
        <h3 className='font-Clash text-3xl md:text-[3.3vw] font-medium'>
          Currently
        </h3>
        <p className='md:text-[1.4vw] text-[#717171]'>
          {weather &&
            weather.current.weather[0].description.charAt(0).toUpperCase() +
              weather.current.weather[0].description.slice(1)}
        </p>
      </div>
      <div className='flex flex-row items-center gap-7 md:gap-10 md:mt-4 overflow-y-hidden overflow-x-scroll'>
        <h2 className='font-Clash text-6xl md:text-[6vw]'>
          {weather && Math.round(weather.current.temp)}ºC
        </h2>
        <div className='flex flex-row gap-5 md:gap-7 mt-4 md:mt-0'>
          <WeatherCondition
            label='Precipitation'
            value={
              weather && typeof weather.hourly[0].pop != "undefined"
                ? Math.round(weather.hourly[0].pop)
                : 0
            }
            unit='%'
          />
          <WeatherCondition
            label='Wind'
            value={weather ? Math.round(weather.current.wind_speed) : 0}
            unit=' km/h'
          />
          <WeatherCondition
            label='Humidity'
            value={weather ? Math.round(weather.current.humidity) : 0}
            unit='%'
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
