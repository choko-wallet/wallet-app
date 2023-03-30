// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from "next/image";
import React from "react";

import ThreeDStarBg from "./ThreeDStarBg";
import ThreeDGallery from "./ThreeDGallery";

const pexel = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel(327482),
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel(325185),
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel(358574),
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel(227675),
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel(911738),
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel(1738986),
  },
];

const Curation = (): JSX.Element => {
  return (
    <section className='snap-start relative' id='nft'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
      </div>

      <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-20'>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full '>
            <p className='text-[25px] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-center mt-20 font-sso'>
              Curation
            </p>
            <ThreeDGallery images={images} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curation;
