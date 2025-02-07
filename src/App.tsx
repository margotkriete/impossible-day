import { useState, useEffect } from "react";
import formattedAds from "./formatted_books.json";
import "./App.css";
import { getBookInfo } from "./services/getBookInfo";
import { OpenLibraryBook } from "./types/Books";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isDocumentFetched, setIsDocumentFetched] = useState(false);
  const [document, setDocument] = useState<OpenLibraryBook | null>(null);
  const getNextImage = function () {
    setCountdown(3);
    setIsDocumentFetched(false);
    setDocument(null);
    setCurrentImageIndex(currentImageIndex + 1);
  };

  useEffect(() => {
    if (!countdown) {
      const handler = async () => {
        revealHandler();
      };
      handler();
      return;
    }
    const interval = setInterval(function () {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const revealHandler = async () => {
    const documents = await getBookInfo({
      title: formattedAds[currentImageIndex]["title"],
      author: formattedAds[currentImageIndex]["author"],
    });
    setIsDocumentFetched(true);
    setDocument(documents.length > 0 ? documents[0] : null);
  };

  return (
    <>
      <img
        src={`/src/assets/${formattedAds[currentImageIndex]["image"]}/screensvr.png`}
      />
      <>
        <br />
        <button onClick={getNextImage} style={{ marginRight: "10px" }}>
          Next
        </button>
        {!isDocumentFetched && <h2 style={{ color: "red" }}>{countdown}</h2>}
      </>
      {isDocumentFetched && document && (
        <>
          <h4>{document.author_name}</h4>
          <h4>{document.first_sentence}</h4>
          <h4>{document.first_publish_year}</h4>
        </>
      )}
      {isDocumentFetched && !document && (
        <>
          <h4>hallucinated book found</h4>
        </>
      )}
    </>
  );
}

export default App;
