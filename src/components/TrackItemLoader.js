import React from "react";

const TrackItemLoader = () => {
  return (
    <li className="track-item">
      <div className="left-side">
        <div src="" alt="" className="skeleton" />
        <div>
          <h4 className="skeleton skeleton-text">{}</h4>
          <p className="skeleton skeleton-text"></p>
        </div>
      </div>
    </li>
  );
};

export default TrackItemLoader;
