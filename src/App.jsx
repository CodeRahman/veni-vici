import { useState } from 'react';
import './App.css';
import ArtworkDisplay from './components/ArtworkDisplay';
import Spinner from "./components/Spinner";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentPic, setCurrentPic] = useState({
    hdurl: '',
    thumbnail_url: '',
    url: '',
    title: '',
    date: '',
    explanation: '',
    copyright: '',
    service_version: ''
  });

  const [isDisplayVisible, setIsDisplayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    return json;
  };

  const updatePicData = async () => {
    const data = await callAPI(
      `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&count=1&hd=true&thumbs=true`
    );
    const pic = data[0];

      setCurrentPic({
        hdurl: pic.hdurl,
        thumbnail_url: pic.thumbnail_url,
        url: pic.url,
        title: pic.title,
        date: pic.date,
        explanation: pic.explanation,
        copyright: pic.copyright,
        service_version: pic.service_version
      });

      setIsLoading(false)

    
  };

  return (
    <div className="app-container">
      <h1>Astronomy Pictures</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        isDisplayVisible && <ArtworkDisplay data={currentPic} />
      )}

      <button
        onClick={() => {
          setIsDisplayVisible(true);
          setIsLoading(true);
          updatePicData();
          
        }}
      >
        🔀 Discover!
      </button>
      
    </div>
  );
}

export default App;
