import { IconContext } from "react-icons";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnowflakeCold,
  WiFog,
} from "react-icons/wi";

interface PropsType {
  label: string;
  value: number;
  icon: string;
}

const icons: { [icon: string]: JSX.Element } = {
  "01d": <WiDaySunny />,
  "01n": <WiNightClear />,
  "02d": <WiDayCloudy />,
  "02n": <WiNightAltCloudy />,
  "03d": <WiCloud />,
  "03n": <WiCloud />,
  "04d": <WiCloudy />,
  "04n": <WiCloudy />,
  "09d": <WiRain />,
  "09n": <WiRain />,
  "10d": <WiDayRain />,
  "10n": <WiNightAltRain />,
  "11d": <WiThunderstorm />,
  "11n": <WiThunderstorm />,
  "13d": <WiSnowflakeCold />,
  "13n": <WiSnowflakeCold />,
  "50d": <WiFog />,
  "50n": <WiFog />,
};

function WeatherDetail({ label, value, icon }: PropsType) {
  return (
    <div className='flex flex-col items-center text-center gap-1'>
      <p className='text-xl'>{label}</p>
      <p className='text-2xl font-medium'>{value}ºC</p>
      <IconContext.Provider value={{ size: "42" }}>
        {icons[icon]}
      </IconContext.Provider>
    </div>
  );
}

export default WeatherDetail;
