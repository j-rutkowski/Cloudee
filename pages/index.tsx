import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import CurrentWeather from "../components/CurrentWeather";
import FutureWeather from "../components/FutureWeather";
import SearchBar from "../components/SearchBar";
import { useWeatherContext } from "../contexts/WeatherContext";
import { ApiResponse } from "../types/WeatherTypes";
import { SearchTermType } from "../types/SearchTypes";

const Home: NextPage = () => {
  const [searchTerm, updateSearchTerm] = useState<SearchTermType>({
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
  });

  const { setWeather } = useWeatherContext();

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData: ApiResponse = await fetch(
        `/api/weather?lat=${searchTerm.lat}&lon=${searchTerm.lon}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setWeather(weatherData);
    };
    fetchWeather();
  }, [searchTerm]);
  return (
    <div>
      <Head>
        <title>Cloudee</title>
        <meta name='description' content='Minimalistic weather app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='grid grid-cols-3 w-screen h-screen'>
        <div className='relative'>
          <Image
            src='/sydney.jpg'
            alt='Sydney'
            layout='fill'
            className='object-cover'
          />
        </div>
        <div className='col-span-2 w-full h-full relative px-[150px] py-[50px]'>
          <SearchBar updateSearchTerm={updateSearchTerm} />
          <div className='mt-10 flex flex-col gap-8'>
            <h1 className='font-Clash font-bold text-8xl'>{searchTerm.city}</h1>
            <CurrentWeather />
            <FutureWeather />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
