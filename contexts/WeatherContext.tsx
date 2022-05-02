import { createContext, useContext, useState } from "react";
import { ApiResponse } from "../types/WeatherTypes";

type ContextType = {
  weather: ApiResponse | null;
  setWeather: (weather: ApiResponse | null) => void;
};

const WeatherContext = createContext<ContextType>({
  weather: {} as ApiResponse,
  setWeather: (weather: ApiResponse | null) => null,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<ApiResponse | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  return useContext(WeatherContext);
}
