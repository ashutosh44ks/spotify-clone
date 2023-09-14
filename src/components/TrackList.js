import { ReactComponent as SearchIcon } from "../assets/Search.svg";
import TrackItem from "./TrackItem";
import TrackItemLoader from "./TrackItemLoader";

const TrackList = ({
  showListMobile,
  setShowListMobile,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  tracks,
  activeTrackId,
  setactiveTrackId,
  loading,
}) => {
  return (
    <>
      <div
        className={`py-10 w-[35vw] track-list-container ${
          showListMobile ? "mobile-view" : ""
        }`}
      >
        <div className="tabs flex gap-4 mb-8 px-4">
          <div
            className={activeTab === "For you" ? "tab active" : "tab"}
            onClick={() => setActiveTab("For you")}
          >
            For you
          </div>
          <div
            className={activeTab === "Top tracks" ? "tab active" : "tab"}
            onClick={() => setActiveTab("Top tracks")}
          >
            Top Tracks
          </div>
        </div>
        <div className="search-bar px-4">
          <input
            type="text"
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
        </div>
        <div className="track-list my-6">
          <ul className="px-2">
            {!loading
              ? tracks.map((track) => (
                  <TrackItem
                    track={track}
                    activeTrackId={activeTrackId}
                    setactiveTrackId={setactiveTrackId}
                    key={track.id}
                  />
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                  <TrackItemLoader key={index} />
                ))}
          </ul>
        </div>
      </div>
      {showListMobile && (
        <div
          className="gradient-close"
          onClick={() => setShowListMobile(false)}
        />
      )}
    </>
  );
};

export default TrackList;
