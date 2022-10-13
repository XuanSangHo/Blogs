import React from 'react';

import './style.scss';

interface TitleProps {
  title: string;
}

export default function TitleForm({ title }: TitleProps): JSX.Element {
  return <h2 className="title-form">{title}</h2>;
}
