'use client';

import dynamic from 'next/dynamic';
import config from '@/config';
import React from 'react';
import * as files from './files';

// Importar Player dinámicamente SOLO en cliente
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

export type FileName = keyof typeof files;

export interface LottieAnimationProps {
  name: FileName;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  name,
  autoplay = config.environment !== 'ci',
  loop = true,
  className,
}) => {
  const src = files[name];
  return (
    <Player className={className} autoplay={autoplay} loop={loop} src={src} />
  );
};

export const Spinner: React.FC<Omit<LottieAnimationProps, 'name'>> = (props) => (
  <LottieAnimation name='spinner' {...props} />
);

export const GreenPulse: React.FC<Omit<LottieAnimationProps, 'name'>> = (props) => (
  <LottieAnimation name='greenPulse' {...props} />
);

export default LottieAnimation;
