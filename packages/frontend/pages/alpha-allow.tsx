// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

function AlphaAllow (): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);

  const [accessKey, setAccessKey] = useState<string>("");
  const [discordInfo, setDiscordInfo] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    const ak = localStorage.getItem('accessKey');
    if (ak) {
      setAccessKey(ak);
    }

    if (submit && accessKey && discordInfo && intro) {
      (async() => {
        const res = await superagent
          .post('https://formapi.skye.kiwi/choko/alpha/newUser')
          .send({ accessKey: accessKey, discordInfo: discordInfo, intro: intro });
  
        localStorage.setItem('accessKey', accessKey);
        setAccessToken(res.body['data']);
      })()
    }
  }, [submit, accessKey, discordInfo, intro]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 h-screen content-center color-bg'>
      <div className='grid grid-cols-12 col-span-10 col-start-2 gap-y-5'>
        <div className=' col-span-12 shadow-xl rounded-lg'>
          <div className='card p-5 md:p-10 '
            style={{ background: 'white' }}>
            <h2 className='card-title'>
              Allow a user to alpha test
            </h2><br />
            <h3></h3>

            <div className='grid grid-col-12 col-span-12'>
              <input className='input col-span-6 input-bordered w-full max-w-xs m-3'
                onChange={(e) => setAccessKey(e.target.value)}

                placeholder='Access Key'
                type='text'

                value={accessKey}
              />
              <input className='input col-span-6 input-bordered w-full max-w-xs m-3'
                onChange={(e) => setDiscordInfo(e.target.value)}

                placeholder='Discord Info'
                type='text'

                value={discordInfo}
              />
              <input className='input col-span-6 input-bordered w-full max-w-xs m-3'
                onChange={(e) => setIntro(e.target.value)}

                placeholder='Discord Intro'
                type='text'

                value={intro}
              />
              <button className={`btn btn-accent col-span-6 w-full max-w-xs m-3  ${submit ? 'btn-disabled':""}`}
                onClick={(e) => setSubmit(true)}>
                Submit 
              </button>

              <div className='col-span-6 w-1/2' style={{ overflowWrap: 'break-word' }}>
                Access Token : <br/>{accessToken}
              </div><br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AlphaAllow;
