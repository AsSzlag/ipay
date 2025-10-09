import React, { type ReactNode } from 'react';
import bgLogoIcon from '@assets/icons/bgLogoIcon.svg';

interface CustomBgProps {
  children: ReactNode;
  topRightColor?: string;
  bottomLeftColor?: string;
}

const IpayBg: React.FC<CustomBgProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 168px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Right SVG */}
      <img
        src={bgLogoIcon}
        alt="Background decoration"
        style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          width: '400px',
          height: '400px',
          zIndex: 0,
        }}
      />

      {/* Bottom Left SVG */}
      <img
        src={bgLogoIcon}
        alt="Background decoration"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '450px',
          height: '450px',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default IpayBg;
