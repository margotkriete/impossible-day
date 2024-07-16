import { useState } from "react";
import ads from "./directory_names.json";
import "./App.css";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const getNextImage = function () {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <>
      <button onClick={getNextImage}>Next</button>
      <img src={`/src/assets/${ads[currentImageIndex]}/screensvr.png`} />
    </>
  );
}

export default App;
