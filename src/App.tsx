import { useState } from "react";
import "./App.css";

function App() {
  // var files = fs.readdirSync("/assets/");
  const [currentImage, setCurrentImage] = useState(
    "src/assets/1495631310801_XX-87c86ef41ae28c5a2861a209e10b2dfd21915d28c16ac54274831101d723f164/screensvr.png"
  );

  const getNextImage = function () {};

  return (
    <>
      <button onClick={getNextImage}>Next</button>
      <img src={currentImage} />
    </>
  );
}

export default App;
