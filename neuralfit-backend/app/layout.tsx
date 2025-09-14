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
          <div className="min-h-screen bg-slate-50 text-slate-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
