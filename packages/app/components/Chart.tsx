// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const data = [
  {
    amt: 2400,
    name: 'Page A',
    pv: 2400,
    uv: 4000
  },
  {
    amt: 2210,
    name: 'Page B',
    pv: 1398,
    uv: 3000
  },
  {
    amt: 2290,
    name: 'Page C',
    pv: 9800,
    uv: 2000
  },
  {
    amt: 2000,
    name: 'Page D',
    pv: 3908,
    uv: 2780
  },
  {
    amt: 2181,
    name: 'Page E',
    pv: 4800,
    uv: 1890
  },
  {
    amt: 2500,
    name: 'Page F',
    pv: 3800,
    uv: 2390
  },
  {
    amt: 2100,
    name: 'Page G',
    pv: 4300,
    uv: 3490
  }
];

function Chart (): JSX.Element {
  const [showChart, setShowChart] = useState<boolean>(false);
  const tabs = ['1H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleShowChart = () => {
    setShowChart(false);
    setTimeout(() => {
      setShowChart(true);
    }, 400);
  };

  useEffect(() => {
    handleShowChart();
  }, []);

  console.log('showChart', showChart);

  return (
    <div>
      {showChart ? (
        <div className='bg-transparent dark:bg-[#1A1A1A] mt-4 w-full h-[160px] sm:h-[220px] md:w-[560px] md:h-[260px] rounded-lg'>
          <ResponsiveContainer debounce={1000}
            height='100%'
            width='100%'>
            <LineChart data={data}
              height={100}
              width={300}>
              <Line
                dataKey='pv'
                stroke='#8884d8'
                strokeWidth={2}
                type='monotone'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className='w-full h-[160px] sm:h-[220px] md:w-[560px] md:h-[260px] bg-[#121212] rounded-lg'></div>
      )}

      <div className='flex w-full items-center justify-between px-2 my-2  rounded-lg p-2'>
        {tabs.map((item) => (
          <div
            className={
              item === selectedTab
                ? ' font-inter text-[16x] cursor-pointer px-3 py-1 transition duration-150 rounded-full bg-[#0170BF] font-semibold text-[#F5CBD5] active:scale-90 ease-in-out flex items-center justify-center'
                : 'text-black dark:text-white font-inter text-[12px] font-normal cursor-pointer px-3 py-1 transition duration-150 rounded-full shadow-md  hover:bg-[#0170BF] hover:font-semibold hover:text-[#F5CBD5] hover:shadow-xl active:scale-90 ease-in-out flex items-center justify-center'
            }
            key={item}
            onClick={() => setSelectedTab(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chart;
