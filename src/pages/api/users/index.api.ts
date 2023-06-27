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

  const userExist = await prisma.user.findUnique({
    where: { username },
  })

  if (userExist) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const user = await prisma.user.create({
    data: {
      username,
      userfullname,
    },
  })

  return res.status(201).json(user)
}
