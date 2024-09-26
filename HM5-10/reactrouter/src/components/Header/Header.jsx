import React from 'react';

export default function Header(props) {
    const { importance = 'h1', className, title } = props;
    const validHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const headerTag = validHeaders.includes(importance) ? importance : 'h1';
    const header = React.createElement(headerTag, { className }, title);
    return header;
  }
  