// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import Image from "next/image";
import React from "react";

import ThreeDGallery from "./ThreeDGallery";
import ThreeDStarBg from "./ThreeDStarBg";
// import nft7 from "../images/nft7.png";

// const pexel = (id: number) =>
//   `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "./blank.svg" },
  // // Back
  // { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "./nft.png" },
  // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: "./nft3.png" },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: "./blockchain4.jpg",
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: "./metaverse1.jpg",
  },
  // {
  //   position: [-2, 0, 2.75],
  //   rotation: [0, Math.PI / 2.5, 0],
  //   url: "./nft5.png",
  // },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "./web3-4.jpg",
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "./metaverse3.jpg",
  },
  // {
  //   position: [2, 0, 2.75],
  //   rotation: [0, -Math.PI / 2.5, 0],
  //   url: "./nfts.png",
  // },
];

const Curation = (): JSX.Element => {
  return (
    <section className='snap-start relative' id='nft'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
      </div>

      <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-20 overflow-hidden'>
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
