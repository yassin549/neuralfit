'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return <SessionProvider basePath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`}>{children}</SessionProvider>
}
