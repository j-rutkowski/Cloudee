type propsType = {
  label: string;
  value: number;
  unit: string;
};

function WeatherCondition({ label, value, unit }: propsType) {
  return (
    <div className='flex flex-col text-center'>
      <p className='text-3xl'>{label}</p>
      <p className='text-2xl'>
        {value}
        {unit}
      </p>
    </div>
  );
}

export default WeatherCondition;
