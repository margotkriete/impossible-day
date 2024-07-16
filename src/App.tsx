import { useState } from "react";
import ads from "./directory_names.json";
import formattedAds from "./formatted_books.json";
import "./App.css";
import { getBookInfo } from "./services/getBookInfo";
import { OpenLibraryBook } from "./types/Books";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDocumentFetched, setIsDocumentFetched] = useState(false);
  const [document, setDocument] = useState<OpenLibraryBook | null>(null);
  const getNextImage = function () {
    setIsDocumentFetched(false);
    setDocument(null);
    setCurrentImageIndex(currentImageIndex + 1);
  };

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
      <button onClick={getNextImage}>Next</button>
      <img src={`/src/assets/${ads[currentImageIndex]}/screensvr.png`} />
      <h5>{formattedAds[currentImageIndex]["description"]}</h5>
      {!isDocumentFetched && <button onClick={revealHandler}>Reveal</button>}
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
