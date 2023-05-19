import { NextApiRequest, NextApiResponse } from 'next'

export default async function hello(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  return response.status(404).json({
    message: 'Not found',
  })
}
