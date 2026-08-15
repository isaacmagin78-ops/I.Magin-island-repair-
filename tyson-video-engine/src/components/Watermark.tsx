import React from 'react';
import {Img} from 'remotion';

export interface WatermarkProps {
  src: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  opacity?: number;
  width?: number;
  margin?: number;
}

/** Persistent corner logo/watermark overlay, visible for the whole video. */
export const Watermark: React.FC<WatermarkProps> = ({
  src,
  position = 'bottom-right',
  opacity = 0.85,
  width = 140,
  margin = 40,
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width,
    opacity,
    ...(position.includes('top') ? {top: margin} : {bottom: margin}),
    ...(position.includes('left') ? {left: margin} : {right: margin}),
  };

  return <Img src={src} style={style} />;
};
