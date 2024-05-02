import { useContext } from "react";
import AudioContext from "../Context/AudioProvider";

const useAudio = () => {
  return useContext(AudioContext);
};
export default useAudio;
