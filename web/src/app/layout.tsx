import type { Metadata } from 'next'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const roboto = Roboto_Flex({ subsets: ['latin'] , variable: '--font-roboto'})
const baijamjuree = Bai_Jamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai_jamjuree'})

export const metadata: Metadata = {
  title: 'NLW Spacetime',
  description: 'Usando React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baijamjuree.variable} font-sans text-gray-100 bg-gray-900`}>{children}</body>
    </html>
  )
}
