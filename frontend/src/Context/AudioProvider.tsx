import { createContext, useState } from "react";

type audioState = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<any>>;
  songId: string;
  setSongId: React.Dispatch<React.SetStateAction<any>>;
};

const initialAudioState: audioState = {
  isPlaying: false,
  setIsPlaying: () => {},
  songId: "",
  setSongId: () => {},
};

type providerProps = {
  children: React.ReactNode;
};

const AudioContext = createContext<audioState>(initialAudioState);

export const AudioProvider = ({ children }: providerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songId, setSongId] = useState("");

  return (
    <AudioContext.Provider
      value={{ isPlaying, setIsPlaying, songId, setSongId }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
