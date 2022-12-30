// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable */

export const staggerContainer = {
  hidden: {
  },
  show: {
  }
};

export const textContainer = {
  hidden: {
    opacity: 0
  },
  show: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  })
};

export const textVariant = (delay: string) => ({
  hidden: {
    y: 50,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay
    }
  }
});

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 0
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn'
    }
  }
};

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut'
    }
  }
});

export const planetVariants = (direction: string) => ({
  hidden: {
    x: direction === 'left' ? -500 : 0,
    rotate: 120
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5
    }
  }
});
