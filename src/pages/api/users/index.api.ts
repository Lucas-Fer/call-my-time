import { prisma } from '@/lib/Prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, userfullname } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      userfullname,
    },
  })

  return res.status(201).json(user)
}
