import React from 'react';

const ArtworkDisplay = ({ data}) => {
  const {hdurl, thumbnail_url, url, title, date, explanation, copyright, service_version, concepts} = data;

  

  return (
    <div className="ArtArea">
      <h2>{title}</h2>
      <h4>Date: {date}</h4>
      <img src={hdurl || url || thumbnail_url} alt={title} width={300} height={300} />
      <p> </p>
      <a href={hdurl} target='_blank'>HD: {hdurl || "No HD url"}</a> 
      <p> </p>
      <a href={url} target='_blank'>URL: {url || 'This is a video, see link below'}</a>
      <a href={thumbnail_url} target='_blank'>{thumbnail_url}</a>
      <div className="statsBox">
        <p className="stats">
          Explanation: {explanation}
        </p>
        <p className="stats">
          Copyright: {copyright || 'No copyright'}
        </p>
      </div>
    </div>
  );
};

export default ArtworkDisplay;
