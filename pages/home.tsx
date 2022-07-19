import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer';
import btc from '../images/btc.png'
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'


function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div>
      <Header />
      {/* <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
        <Image
          src={bg}
          layout="fill"
          objectFit="contain"
        />
      </div> */}
      <div className="flex flex-col max-w-2xl px-8 mx-auto my-10 sm:px-16 ">
        <div className="stats bg-primary text-primary-content ">
          <div className="stat">
            <div className="stat-title">Account balance</div>
            <div className="stat-value">$66,600</div>
            <div className="stat-desc">24h  ↗︎ 400 (3%)</div>
            <div className="stat-actions">
              {/* <button class="btn btn-sm btn-success">Add funds</button> */}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Accont Id</div>
            <div className="stat-title">111111......1111</div>
            <button className="btn btn-sm w-16">copy</button>
            {/* <div class="stat-actions">
              <button class="btn btn-sm">copy</button>
            </div> */}
          </div>
        </div>



        <div className="stats stats-horizontal shadow">
          <div className="relative stat">
            <Image
              src={btc}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="stat">
            <div className="stat-title">Bitcoin</div>
            <div className="stat-value">$30,000</div>
            <div className="stat-desc">1.5020306</div>
          </div>

          <div className="stat">
            <div className="stat-title">market price</div>
            <div className="stat-value">20,200</div>
            <div className="stat-desc">↘︎ 2000 (2%) 24hrs</div>
          </div>
        </div>

        <div className="stats stats-horizontal shadow">
          <div className="relative stat">
            <Image
              src={btc}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="stat">
            <div className="stat-title">Bitcoin</div>
            <div className="stat-value">$30,000</div>
            <div className="stat-desc">1.5020306</div>
          </div>

          <div className="stat">
            <div className="stat-title">market price</div>
            <div className="stat-value">20,200</div>
            <div className="stat-desc">↘︎ 2000 (2%) 24hrs</div>
          </div>
        </div>

        <div className="stats stats-horizontal shadow">
          <div className="relative stat">
            <Image
              src={btc}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="stat">
            <div className="stat-title">Bitcoin</div>
            <div className="stat-value">$30,000</div>
            <div className="stat-desc">1.5020306</div>
          </div>

          <div className="stat">
            <div className="stat-title">market price</div>
            <div className="stat-value">20,200</div>
            <div className="stat-desc">↘︎ 2000 (2%) 24hrs</div>
          </div>
        </div>


      </div>






      <Footer />
    </div>
  )
}

export default Home