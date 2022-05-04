import { IconContext } from "react-icons";
import { useViewport } from "../hooks/UseViewportHook";
import { WiRain, WiWindy, WiRaindrop } from "react-icons/wi";

type propsType = {
  label: string;
  value: number;
  unit: string;
};

const icons: { [icon: string]: JSX.Element } = {
  Precipitation: <WiRain />,
  Wind: <WiWindy />,
  Humidity: <WiRaindrop />,
};

function WeatherCondition({ label, value, unit }: propsType) {
  const { width } = useViewport();

  return (
    <div className='flex flex-col text-center whitespace-nowrap'>
      {width < 769 ? (
        <IconContext.Provider value={{ size: "42" }}>
          {icons[label]}
        </IconContext.Provider>
      ) : (
        <p className='text-xl md:text-[2vw]'>{label}</p>
      )}
      <p className='md:text-[1.66vw]'>
        {value}
        {unit}
      </p>
    </div>
  );
}

export default WeatherCondition;
