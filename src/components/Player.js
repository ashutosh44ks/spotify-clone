import { useEffect, useRef, useState } from "react";
import playerOptIcon from "../assets/PlayerOpt.svg";
import playerVolIcon from "../assets/PlayerVol.svg";
import playerVolMutedIcon from "../assets/PlayerVolMuted.svg";
import playerNextIcon from "../assets/PlayerNext.svg";
import playerPrevIcon from "../assets/PlayerPrev.svg";
import playerPlayIcon from "../assets/PlayerPlay1.svg";
import playerPauseIcon from "../assets/PlayerPause.svg";

const Player = ({ tracks, activeTrackId, setActiveTrackId, loading }) => {
  const [firstPlay, setFirstPlay] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [lastVolume, setLastVolume] = useState(1);
  const [seeker, setSeeker] = useState(0);
  const myPlayer = useRef();
  useEffect(() => {
    if (activeTrackId !== null) {
      // refresh the audio player
      myPlayer.current.load();
      // fix play() failed because the user didn't interact with the document first
      if (firstPlay) setFirstPlay(false);
      else {
        myPlayer.current.play();
        setIsPlaying(true);
        setSeeker(0);
      }
    }
  }, [activeTrackId]);

  function playMusic() {
    myPlayer.current.play();
  }
  function pauseMusic() {
    myPlayer.current.pause();
  }
  function muteMusic() {
    setLastVolume(myPlayer.current.volume);
    myPlayer.current.volume = 0;
    setIsMute(true);
  }
  function unmuteMusic() {
    myPlayer.current.volume = lastVolume;
    setIsMute(false);
  }
  function playNextTrack() {
    if (activeTrackId === null) return;
    const nextTrack = tracks.findIndex((t) => t.id === activeTrackId) + 1;
    if (nextTrack > tracks.length - 1) setActiveTrackId(tracks[0].id);
    else setActiveTrackId(tracks[nextTrack].id);
  }
  function playPrevTrack() {
    if (activeTrackId === null) return;
    const prevTrack = tracks.findIndex((t) => t.id === activeTrackId) - 1;
    console.log(prevTrack);
    if (prevTrack < 0) setActiveTrackId(tracks[tracks.length - 1].id);
    else setActiveTrackId(tracks[prevTrack].id);
  }

  return (
    <div className="flex flex-col justify-center py-12 px-10 lg:px-16 mx-auto player">
      <div className="mb-6 lg:mb-8">
        <h1 className={loading ? "skeleton skeleton-text" : ""}>
          {tracks.find((t) => t.id === activeTrackId)?.name}
        </h1>
        <p className={loading ? "skeleton skeleton-text" : ""}>
          {tracks.find((t) => t.id === activeTrackId)?.artist}
        </p>
      </div>
      {loading ? (
        <div className="h-[16rem] w-[16rem] lg:h-[18rem] lg:w-[18rem] skeleton skeleton-text" />
      ) : (
        <img
          src={`${process.env.REACT_APP_BASE_API_URL}/assets/${
            tracks.find((t) => t.id === activeTrackId)?.cover
          }`}
          alt="cover"
          className="h-[16rem] w-[16rem] lg:h-[18rem] lg:w-[18rem] 
        max-h-[50vh]"
        />
      )}

      <div className="pt-4 pb-6 lg:pt-6 lg:pb-8">
        <input
          className="w-full"
          type="range"
          min="0"
          max={myPlayer.current?.duration || 100}
          value={seeker}
          onChange={(e) => {
            myPlayer.current.currentTime = e.target.value;
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <img src={playerOptIcon} alt="settings" />
        </div>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer" onClick={playPrevTrack}>
            <img src={playerPrevIcon} alt="Prev" />
          </div>
          <div
            onClick={() => {
              if (isPlaying) pauseMusic();
              else playMusic();
              setIsPlaying(!isPlaying);
            }}
            className="cursor-pointer"
          >
            {isPlaying ? (
              <img src={playerPauseIcon} alt="Pause" />
            ) : (
              <img src={playerPlayIcon} alt="Play" />
            )}
          </div>
          <div className="cursor-pointer" onClick={playNextTrack}>
            <img src={playerNextIcon} alt="Next" />
          </div>
        </div>
        <div
          onClick={() => {
            if (isMute) unmuteMusic();
            else muteMusic();
          }}
          className="cursor-pointer"
        >
          {isMute ? (
            <img src={playerVolMutedIcon} alt="unmute" />
          ) : (
            <img src={playerVolIcon} alt="mute" />
          )}
        </div>
      </div>
      <audio
        controls
        className="audio-player"
        ref={myPlayer}
        onTimeUpdate={(e) => {
          setSeeker(e.target.currentTime);
        }}
        onEnded={playNextTrack}
      >
        <source
          src={tracks.find((t) => t.id === activeTrackId)?.url}
          type="audio/mp3"
        />
      </audio>
    </div>
  );
};

export default Player;
