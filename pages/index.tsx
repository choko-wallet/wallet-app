import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner';

const Home: NextPage = () => {
  return (
    <div>
      <Head><title>Choko Wallet</title></Head>
      <Header />
      <main>
        <Banner />
      </main>
    </div>
  )
}

export default Home
