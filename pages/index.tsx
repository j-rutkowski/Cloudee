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
import { useViewport } from "../hooks/UseViewportHook";

const Home: NextPage = () => {
  const [searchTerm, updateSearchTerm] = useState<SearchTermType>({
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
  });
  // Get the function to set global weather state
  const { setWeather } = useWeatherContext();

  // Get the current viewport width
  const { width } = useViewport();

  useEffect(() => {
    // Get the weather data from the API route
    const fetchWeather = async () => {
      const weatherData: ApiResponse = await fetch(
        `/api/weather?lat=${searchTerm.lat}&lon=${searchTerm.lon}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      // Set the global weather state
      setWeather(weatherData);
    };
    fetchWeather();
  }, [searchTerm]);

  return (
    <div>
      <Head>
        <title>Cloudee</title>
        <meta name='description' content='Minimalistic weather app' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 w-screen h-screen'>
        <div className='relative'>
          <Image
            src='/sydney.jpg'
            alt='Sydney'
            layout='fill'
            className='object-cover'
          />
          {width < 769 && <SearchBar updateSearchTerm={updateSearchTerm} />}
        </div>
        <div className='row-span-2 md:col-span-2 w-[92vw] md:w-full h-full relative pl-[7vw] pr-[1vw] py-[3.5vh]'>
          {width > 768 && <SearchBar updateSearchTerm={updateSearchTerm} />}
          <div className='flex flex-col gap-4 md:gap-8 md:mt-10'>
            <h1 className='font-Clash font-bold text-6xl md:text-[6.6vw]'>
              {searchTerm.city}
            </h1>
            <CurrentWeather />
            <FutureWeather />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
