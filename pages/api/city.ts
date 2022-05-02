import type { NextApiRequest, NextApiResponse } from 'next'
import { City } from '../../types/CityTypes';

interface Error {
  error: string;
} 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<City | Error>
) {
  const { lat, lon } = req.query;
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.API_KEY}`)
    .then(data => data.json())
    .then(cities => {
      return res.status(200).json(cities[0])
    })
    .catch(err => res.status(500).json({ error: err.message }))
}
