import React, { createContext, useContext, useState } from "react";

export const PlayerContext = createContext();
export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerContextProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextList, setNextList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [queueList, setQueueList] = useState([]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack: currentTrack,
        isFullscreen: isFullscreen,
        isLoading: isLoading,
        isPlaying: isPlaying,
        nextList: nextList,
        prevList: prevList,
        queueList: queueList,
        setCurrentTrack: setCurrentTrack,
        setIsFullscreen: setIsFullscreen,
        setIsLoading: setIsLoading,
        setIsPlaying: setIsPlaying,
        setNextList: setNextList,
        setPrevList: setPrevList,
        setQueueList: setQueueList
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
