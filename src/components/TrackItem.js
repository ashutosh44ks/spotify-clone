import React from "react";

const TrackItem = ({ track, activeTrackId, setactiveTrackId }) => {
  return (
    <li
      className={`track-item ${activeTrackId === track.id && "active"}`}
      key={track.id}
      onClick={() => setactiveTrackId(track.id)}
    >
      <div className="left-side">
        <img
          src={`https://cms.samespace.com/assets/${track.cover}`}
          alt="cover"
        />
        <div>
          <h4 className="text-white">{track.name}</h4>
          <div className="text-sm">{track.artist}</div>
        </div>
      </div>
      <div className="right-side">{track.duration}</div>
    </li>
  );
};

export default TrackItem;
