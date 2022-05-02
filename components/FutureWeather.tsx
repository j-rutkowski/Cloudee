import { useState } from "react";
import WeatherDetail from "./WeatherDetail";
import { useWeatherContext } from "../contexts/WeatherContext";
import { getWeekDay } from "../utils/GetWeekDay";

function FutureWeather() {
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");
  const { weather } = useWeatherContext();

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-1'>
        <h3
          className={`font-Clash text-5xl cursor-pointer ${
            mode === "hourly" ? "font-medium" : "text-[#717171]"
          }`}
          onClick={() => setMode("hourly")}
        >
          Hourly
        </h3>
        <p className='font-Clash text-5xl text-[#717171]'>/</p>
        <h3
          className={`font-Clash text-5xl cursor-pointer ${
            mode === "daily" ? "font-medium" : "text-[#717171]"
          }`}
          onClick={() => setMode("daily")}
        >
          Daily
        </h3>
      </div>
      <div className='flex flex-row gap-10 mt-4'>
        {weather &&
          weather[mode].map((data, index) => {
            const date = new Date(data.dt * 1000);
            const hour = index === 0 ? "Now" : `${date.getHours()}:00`;
            const day = getWeekDay(date.getDay());
            const value = Math.round(
              typeof data.temp === "number" ? data.temp : data.temp.day
            );
            const icon = data.weather[0].icon;

            return (
              <WeatherDetail
                key={data.dt}
                label={mode === "hourly" ? hour : day}
                value={value}
                icon={icon}
              />
            );
          })}
      </div>
    </div>
  );
}

export default FutureWeather;
