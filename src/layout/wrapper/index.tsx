import React from 'react';
import './style.scss';

type Props = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return (
    <div className="wrapper-page">
      <div className="container">{children}</div>
    </div>
  );
}
