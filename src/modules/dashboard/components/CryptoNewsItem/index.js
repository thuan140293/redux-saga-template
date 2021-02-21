import React from 'react';
import './style.scss';
const CryptoNewsItem = ({item}) => {
  const {image, title} = item;
  return (
    <div className="new-container mt-20">
      <div className="content-left">
        <img
          className="thumbnail gx-rounded-lg"
          src={image ? image : ''}
          alt="..."
        />
      </div>
      <div className="content-right">
        <h4 className="gx-mt-0">{title}</h4>
      </div>
    </div>
  );
};

export default CryptoNewsItem;
