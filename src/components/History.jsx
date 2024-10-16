import React from 'react';

const History = ({ data }) => {
  const { url, title } = data;

  return (
    <>
      <h3>{title}</h3>
      <img src={url} alt="NASA image" width={80} height={80} />
    </>
  );
};

export default History;
