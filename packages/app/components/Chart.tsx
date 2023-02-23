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
      {showChart

        ? <div className='bg-[#121212] w-[560px] h-[260px] rounded-lg'>
          <ResponsiveContainer debounce={1000}
            height='100%'
            width='100%'>
            <LineChart data={data}
              height={100}
              width={300}>
              <Line dataKey='pv'
                stroke='#8884d8'
                strokeWidth={2}
                type='monotone' />
            </LineChart>
          </ResponsiveContainer>
        </div>
        : <div className='w-[560px] h-[260px] bg-[#121212] rounded-lg'></div>

      }
    </div>
  );
}

export default Chart;
