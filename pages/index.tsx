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
import { ImageType } from "../types/ImageTypes";
import { useViewport } from "../hooks/UseViewportHook";

const Home: NextPage = () => {
  const [searchTerm, updateSearchTerm] = useState<SearchTermType>({
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
  });
  const [image, setImage] = useState<ImageType>({
    imageUrl:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjQ4OTB8MHwxfHNlYXJjaHwxfHxTeWRuZXl8ZW58MHx8fHwxNjUxNzY5NTE5&ixlib=rb-1.2.1&q=80&w=1080",
    imageAuthor: "Dan Freeman",
    imageAuthorUrl: "https://unsplash.com/@danfreemanphoto",
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

    // Fetch image data
    const fetchImage = async () => {
      const imageData: ImageType = await fetch(
        `/api/image?query=${searchTerm.city}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      // Set the image state
      setImage(imageData);
    };

    fetchImage();
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
            src={image.imageUrl}
            alt={searchTerm.city}
            layout='fill'
            className='object-cover'
          />
          <div className='absolute left-10 bottom-10'>
            <p className='text-white'>
              Photo by:{" "}
              <a
                href={`${image.imageAuthorUrl}?utm_source=Cloudee&utm_medium=referral`}
                className='underline hover:text-blue-500'
              >
                {image.imageAuthor}
              </a>{" "}
              on{" "}
              <a
                href='https://unsplash.com/?utm_source=Cloudee&utm_medium=referral'
                className='underline hover:text-blue-500'
              >
                Unsplash
              </a>
            </p>
          </div>
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
