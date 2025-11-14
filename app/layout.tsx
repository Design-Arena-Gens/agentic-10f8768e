import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAP CPI Training Academy',
  description: 'Interactive SAP Cloud Platform Integration training platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
