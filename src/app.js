import React, { useRef, useState } from "react";

function App() {
  const videoRef = useRef(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    const tracks = videoRef.current.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].language === lang ? "showing" : "disabled";
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>WebVTT Subtitle Demo (React)</h2>

      <select onChange={handleLanguageChange} value={selectedLang}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      <br />
      <br />

      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        crossOrigin="anonymous"
      >
        <source src="sample.mp4" type="video/mp4" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="captions-en.vtt"
          default
        />
        <track
          label="Français"
          kind="subtitles"
          srcLang="fr"
          src="captions-fr.vtt"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
