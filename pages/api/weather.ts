import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse } from '../../types/WeatherTypes'
interface Error {
  error: string;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | Error>
) {
  const { lat, lon } = req.query;
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.API_KEY}`)
    .then(data => data.json())
    .then(weather => {
      weather.hourly.splice(7);
      weather.daily.splice(7);
      return res.status(200).json(weather)
    })
    .catch(err => res.status(500).json({ error: err.message }))
}
