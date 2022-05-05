import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageType } from '../../types/ImageTypes';
interface Error {
  error: string;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageType | Error>
) {
  const { query } = req.query;
  fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query}&client_id=${process.env.ACCESS_KEY}`)
    .then(data => data.json())
    .then(image => {
      return res.status(200).json({
        imageUrl: image.results[0].urls.regular,
        imageAuthor: image.results[0].user.name,
        imageAuthorUrl: image.results[0].user.links.html
      })
    })
    .catch(err => res.status(500).json({ error: err.message }))
}