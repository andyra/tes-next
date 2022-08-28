import React, { createContext, useContext, useState } from "react";

export const PlayerContext = createContext();
export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerContextProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextList, setNextList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [queueList, setQueueList] = useState([]);
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;

  return (
    <PlayerContext.Provider
      value={{
        currentTrack: currentTrack,
        isLoading: isLoading,
        isPlaying: isPlaying,
        nextList: nextList,
        playerIsEmpty: playerIsEmpty,
        prevList: prevList,
        queueList: queueList,
        setCurrentTrack: setCurrentTrack,
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
