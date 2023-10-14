import Head from 'next/head'
import { Inter } from 'next/font/google'
import CurrencyInput from '@/components/currencyInput'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Money Exchange</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Money Exchange</h1>

        <CurrencyInput />
      </main>
    </>
  )
}
