import React from 'react';

import './style.scss';

interface Props {
  loading: boolean;
}

export default function Loading({ loading }: Props): JSX.Element {
  return loading ? (
    <div className="loading">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
