import './globals.css'
import { ReactNode } from 'react'
import Providers from './Providers'

export const metadata = {
  title: 'NeuralFit',
  description: 'NeuralFit MVP',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-background-dark text-white">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
