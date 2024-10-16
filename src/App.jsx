import { useState } from 'react';
import './App.css';
import ArtworkDisplay from './components/ArtworkDisplay';
import History from './components/History';
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
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

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

    if (
      banList.includes(pic.title) ||
      banList.includes(pic.copyright) ||
      banList.includes(pic.service_version)
    ) {
      updatePicData(); // Fetch a new result if banned
    } else {
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

      setHistory([...history, { ...pic }]);
    }
  };

  const addToBanList = (item) => {
    if (!banList.includes(item)) {
      setBanList([...banList, item]);
    }
  };

  const removeBanListItem = (index) => {
    const updatedBanList = banList.filter((_, i) => i !== index);
    setBanList(updatedBanList);
  };
  const toggleBanList = (item, isBanned) => {
    if (isBanned) {
      // Remove from ban list, add back to attributes
      setBanList(banList.filter((bannedItem) => bannedItem !== item));
    } else {
      // Add to ban list, remove from attributes
      addToBanList(item);
    }
  };

  const getAvailableAttributes = () => {
    const attributes = [
      { name: 'Title', value: currentPic.title },
      { name: 'Copyright', value: currentPic.copyright || 'No copyright' },
      
    ];

    return attributes.filter((attr) => !banList.includes(attr.value));
  };
  return (
    <div className="app-container">
      <h1>Astronomy Picture of the Day</h1>

      {isDisplayVisible && (
        <ArtworkDisplay data={currentPic} onClick={addToBanList} />
      )}

      <button
        onClick={() => {
          setIsDisplayVisible(true);
          updatePicData();
        }}
      >
        🔀 Discover!
      </button>

      {isDisplayVisible && (
        <>
          

          {/* History Section */}
          <div className="historyArea">
            <h1>Viewed Pics</h1>
            <div id="historyItems">
              {history.length > 0 ? (
                history.map((pic, index) => (
                  <div key={index} className="historyElement">
                    <History data={pic} />
                  </div>
                ))
              ) : (
                <p>No pictures viewed yet.</p>
              )}
            </div>
          </div>

            {/* Separate Section for Available Attributes */}
            <div className="attributesSection">
            <h1>Attributes List</h1>
            <div className="attributesList">
              {getAvailableAttributes().map((attr, index) => (
                <button className="banbuttons"key={index} onClick={() => toggleBanList(attr.value, false)}>
                  {attr.name}: {attr.value}
                </button>
              ))}
            </div>
          </div>

          {/* Ban List Section */}
          <div className="banArea">
            <h1>Ban List</h1>
            <div id="banItems">
              {banList.map((item, index) => (
                <button className="banbuttons"
                  key={index}
                  onClick={() => toggleBanList(item, true)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
