import React, { useRef, useState, useEffect } from "react";

function App() {
  const audioRef = useRef(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    const tracks = audio.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].language === selectedLang ? "showing" : "disabled";
    }


    
    const activeTrack = Array.from(tracks).find(
      (t) => t.language === selectedLang
    );

    if (!activeTrack) return;

    const handleCueChange = () => {
      const activeCue = activeTrack.activeCues[0];
      setCaption(activeCue ? activeCue.text : "");
    };

    activeTrack.addEventListener("cuechange", handleCueChange);

    return () => {
      activeTrack.removeEventListener("cuechange", handleCueChange);
    };
  }, [selectedLang]);

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>WebVTT Subtitle Demo (React - Audio)</h2>

      <label>
        Choose Language: &nbsp;
        <select onChange={handleLanguageChange} value={selectedLang}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </label>

      <br />
      <br />

      <audio
        ref={audioRef}
        controls
        crossOrigin="anonymous"
        style={{ width: "100%", maxWidth: "640px" }}
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
        Your browser does not support the audio tag.
      </audio>

      <div
        style={{
          marginTop: "20px",
          background: "#222",
          color: "#fff",
          padding: "10px",
          borderRadius: "6px",
          width: "fit-content",
        }}
      >
        {caption}
      </div>
    </div>
  );
}

export default App;
