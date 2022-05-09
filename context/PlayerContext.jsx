import React, { createContext, useState } from "react";

// create context
export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  // The values that will be given to the context
  const [currentTrack, setCurrentTrack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextList, setNextList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [queueList, setQueueList] = useState([]);

  return (
    // The Provider gives access to the context to its children
    <PlayerContext.Provider
      value={{
        currentTrack: currentTrack,
        isPlaying: isPlaying,
        nextList: nextList,
        prevList: prevList,
        queueList: queueList,
        setCurrentTrack: setCurrentTrack,
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
