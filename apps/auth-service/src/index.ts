import { treaty } from '@elysiajs/eden'

import { env } from '@pepe/validators/env'

import type { AuthService } from '@/main'

const protocol = env.NODE_ENV === 'production' ? 'https' : 'http'

export const { auth } = treaty<AuthService>(`${protocol}://${env.APP_URL}`).api

interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

interface Session {
  user: User | null
  expires: Date
}

export type { AuthService, User, Session }
