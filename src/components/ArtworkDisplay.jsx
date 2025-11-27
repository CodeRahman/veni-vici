import React from 'react';

const ArtworkDisplay = ({ data}) => {
  const {hdurl, thumbnail_url, url, title, date, explanation, copyright, service_version, concepts} = data;

  

  return (
    <div className="ArtArea">
      <h2>{title}</h2>
      <h4>Date: {date}</h4>
      <img className="imag" src={hdurl || url || thumbnail_url} alt={title} width={300} height={300} />
      <p> </p>
      <div className='images'>
        <button className='hdimage'><a href={hdurl} target='_blank'>View Image HD</a></button> 
        <p> </p>
        <button className='image'><a href={url} target='_blank'>View Image</a></button>
      </div>
      
      <div className="statsBox">
        <p className="stats">
          Explanation: {explanation}
        </p>
      </div>
    </div>
  );
};

export default ArtworkDisplay;
