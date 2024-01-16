import type { Metadata } from 'next'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'


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
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baijamjuree.variable} font-sans text-gray-100 bg-gray-900`}>
          <main className='grid grid-cols-2 min-h-screen'>
            {/*left */}
            <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/*blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full"/>
            
            {/*estripes */}
            <div className="absolute bottom-0 right-2 top-0 bg-stripes" />
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero/>
            <Copyright />
            </div>
            {/*right */}
            <div className="flex overflow-y-scroll max-h-screen flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
            </div>
          </main>
        </body>
    </html>
  )
}
