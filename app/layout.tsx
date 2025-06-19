import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saransh Pathak - Portfolio',
  description: 'Web developer passionate about crafting performant, responsive, and user-centric applications. Showcasing projects built with modern stacks like Django, Flask, MongoDB, and Tailwind CSS, with a keen eye for design, optimization, and smooth user experience.',
  generator: 'Saransh Pathak',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
