import { useState, useEffect } from "react";
import axios from "axios";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import TrackList from "./components/TrackList";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [tracksAPI, setTracksAPI] = useState([]);
  const [activeTrackId, setactiveTrackId] = useState(null);

  const getDuration = (url) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
    });
  };
  const convertToMMSS = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  const getTracks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/items/songs`);
      const tracks = data.data.filter((track) => !track.url.includes("https-"));
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].url.includes(" "))
          tracks[i].url = tracks[i].url.replace(" ", "");
        const duration = await getDuration(tracks[i].url);
        tracks[i].duration = convertToMMSS(duration);
      }
      setTracksAPI(tracks);
      setTracks(tracks);
      setactiveTrackId(tracks[0].id);
      console.log(tracks);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getTracks();
  }, []);
  const [activeTab, setActiveTab] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (tracksAPI.length === 0) return;
    if (activeTab === "For you") {
      setTracks(
        tracksAPI.filter(
          (track) =>
            track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (activeTab === "Top tracks") {
      setTracks(
        tracksAPI.filter(
          (track) =>
            track.top_track &&
            (track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              track.artist.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  }, [activeTab, searchQuery, tracksAPI]);

  const [showListMobile, setShowListMobile] = useState(false);
  return (
    <div
      className="flex justify-between h-screen w-screen bg-dark gap-6 lg:gap-8"
      style={{
        background: `linear-gradient(135deg, ${
          tracks.find((t) => t.id === activeTrackId)?.accent
        }, #000000)`,
      }}
    >
      <Sidebar setShowListMobile={setShowListMobile} />
      <TrackList
        showListMobile={showListMobile}
        setShowListMobile={setShowListMobile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tracks={tracks}
        activeTrackId={activeTrackId}
        setactiveTrackId={setactiveTrackId}
        loading={loading}
      />
      <Player
        tracks={tracksAPI}
        activeTrackId={activeTrackId}
        setActiveTrackId={setactiveTrackId}
        loading={loading}
      />
    </div>
  );
}

export default App;
