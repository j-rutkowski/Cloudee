import { IoSearchOutline, IoNavigateCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useRef, useState } from "react";
import { matchCity } from "../utils/MatchCity.js";
import { SearchTermType } from "../types/SearchTypes";
import { City } from "../types/CityTypes.js";

interface PropsType {
  updateSearchTerm: (value: SearchTermType) => void;
}

interface ResultType {
  name: string;
  fullName?: string;
  lat: number;
  lon: number;
}

function SearchBar({ updateSearchTerm }: PropsType) {
  const [results, setResults] = useState<ResultType[]>([]);
  const [value, updateValue] = useState<string>("");
  const searchInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length >= 3) {
      const matches = matchCity(input);
      setResults(matches);
    } else {
      setResults([]);
    }

    updateValue(input);
  };

  const updateCity = (city: ResultType) => {
    updateValue("");
    setResults([]);
    updateSearchTerm({ city: city.name, lat: city.lat, lon: city.lon });
    if (searchInput.current) {
      searchInput.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput.current) {
        if (results.length > 0) {
          updateCity(results[0]);
        }
        searchInput.current.blur();
      }
    }
  };

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const cityData: City = await fetch(`/api/city?lat=${lat}&lon=${lon}`)
            .then((res) => res.json())
            .catch((err) => console.log(err));
          updateCity({
            name: cityData.name,
            lat: cityData.lat,
            lon: cityData.lon,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div className='flex flex-col relative w-[85%] max-w-[500px] mx-auto md:mx-0 mt-[10vw] md:mt-0'>
      <div className='relative w-full'>
        <input
          type='text'
          className='w-full h-[50px] border border-black px-5 py-4 text-2xl'
          placeholder='Search for a city'
          value={value}
          ref={searchInput}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div className='absolute top-0 right-0 mr-4 mt-2 flex flex-row gap-2'>
          <IconContext.Provider
            value={{
              size: "32",
              className: "hover:text-blue-500 hover:cursor-pointer",
            }}
          >
            <IoNavigateCircleOutline onClick={getCurrentPosition} />
            <IoSearchOutline />
          </IconContext.Provider>
        </div>
      </div>
      {results.length > 0 && document.activeElement === searchInput.current && (
        <div className='flex flex-col absolute top-[50px] bg-white w-full p-5 gap-2 shadow-md max-h-60 overflow-y-scroll z-10'>
          {results.map((city, index) => (
            <p
              className='font-medium cursor-pointer hover:text-blue-600'
              key={`${city}-${index}`}
              onClick={() => updateCity(city)}
            >
              {city.fullName}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
