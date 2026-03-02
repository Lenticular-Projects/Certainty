import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import { AmbientProvider } from '@/context/AmbientContext'
import { MotionProvider } from '@/components/layout/MotionProvider'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import './globals.css'

const geist = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Certainty System',
  description: 'The system that turns a conversation into a commitment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body>
        <MotionProvider>
          <AmbientProvider>
            <Nav />
            {children}
            <Footer />
          </AmbientProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
